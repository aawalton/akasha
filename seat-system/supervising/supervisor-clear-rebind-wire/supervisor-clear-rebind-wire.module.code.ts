import { rotatedOf } from "akasha/seat-system/seat-rotated-session/seat-rotated-session.module.code.ts"
import {
  setCurrentAgentIdForSelfHeal,
  setCurrentSessionIdForSelfHeal,
} from "akasha/seat-system/self-healing/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
import { claimSeatSupervision } from "akasha/seat-system/supervising/seat-supervisor-claim/seat-supervisor-claim.module.code.ts"
import type { buildAgentLogRedirect } from "akasha/seat-system/supervising/supervisor-console/supervisor-console.module.code.ts"
import { clearSeatRotation } from "akasha/seat-system/supervising/supervisor-heartbeat-beat/supervisor-heartbeat-beat.module.code.ts"
import {
  type ClearRebindHooks,
  performClearRebind,
} from "akasha/seat-system/supervising/supervisor-rebind/supervisor-rebind.module.code.ts"
import type { ClearRebindDeps } from "akasha/seat-system/supervising/supervisor-rebind-deps/supervisor-rebind-deps.module.code.ts"
import { watchSeatRotation } from "akasha/seat-system/supervising/supervisor-rotation-watch/supervisor-rotation-watch.module.code.ts"
import type { AgentIdHandle } from "akasha/seat-system/supervising/supervisor-self-identity/supervisor-self-identity.module.code.ts"
import { setRestoreConsoleHandle } from "akasha/seat-system/supervising/supervisor-state/supervisor-state.module.code.ts"
import type { AgentProcess } from "akasha/seat-system/supervising/supervisor-types/supervisor-types.module.code.ts"

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
