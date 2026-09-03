import { rotatedOf } from "@tools/lib/seat-rotated-session"
import { claimSeatSupervision } from "@tools/lib/seat-supervisor-claim"
import { type ClearRebindHooks, performClearRebind } from "@tools/lib/supervisor-rebind"
import type { ClearRebindDeps } from "@tools/lib/supervisor-rebind-deps"
import { watchSeatRotation } from "@tools/lib/supervisor-rotation-watch"
import {
  setCurrentAgentIdForSelfHeal,
  setCurrentSessionIdForSelfHeal,
} from "@tools/lib/supervisor-self-heal-state"
import type { AgentIdHandle } from "@tools/lib/supervisor-self-identity"
import { setRestoreConsoleHandle } from "@tools/lib/supervisor-state"
import type { AgentProcess } from "@tools/lib/supervisor-types"
import type { buildAgentLogRedirect } from "../supervisor-console/supervisor-console.module.code.ts"
import { clearSeatRotation } from "../supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"

export function wireSessionRotatedWatcher(args: {
  selectedAccount: string
  projDir: string
  deferredRestart: { cancel: (() => void) | null }
  agentIdHandle: AgentIdHandle
  agentLog: ReturnType<typeof buildAgentLogRedirect>
  getAgentId: () => string | null
  getAgentProc: () => AgentProcess | undefined
  setLoopAgentId: (id: string) => void
  setLoopSessionId: (id: string) => void
  deps: ClearRebindDeps
  startSessionWatch: ClearRebindHooks["startSessionWatch"]
}): () => void {
  const claimRotation = (): string | null => {
    const live = args.getAgentId()
    if (live === null) return null
    const stated = rotatedOf(live)
    if (stated === null) return null
    clearSeatRotation(live)
    return stated.value
  }
  return watchSeatRotation(claimRotation, (sessionId) => {
    args.deferredRestart.cancel?.()
    args.deferredRestart.cancel = null
    return performClearRebind(
      sessionId,
      {
        selectedAccount: args.selectedAccount,
        projDir: args.projDir,
        getAgentId: args.getAgentId,
        getAgentProc: args.getAgentProc,
        setAgentId: (id) => {
          args.setLoopAgentId(id)
          args.agentIdHandle.bind(id)
          setCurrentAgentIdForSelfHeal(id)
        },
        setSessionId: (id) => {
          args.setLoopSessionId(id)
          setCurrentSessionIdForSelfHeal(id)
          claimSeatSupervision(args.getAgentId())
        },
        applyConsoleRedirect: (id) => setRestoreConsoleHandle(args.agentLog.redirectTo(id)),
        startSessionWatch: args.startSessionWatch,
      },
      args.deps
    )
  })
}
