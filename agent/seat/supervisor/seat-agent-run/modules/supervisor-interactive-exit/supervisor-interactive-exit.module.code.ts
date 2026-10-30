import { setOAuthProxyHandle } from "akasha/agent/seat/supervisor/modules/supervisor-state/supervisor-state.module.code.ts"
import type { AgentProcess } from "akasha/agent/seat/supervisor/modules/supervisor-types/supervisor-types.module.code.ts"
import { processCleanup } from "akasha/agent/seat/supervisor/seat-agent-start/modules/supervisor-agent-cleanup/supervisor-agent-cleanup.module.code.ts"
import type { InteractiveSessionBoot } from "akasha/agent/seat/supervisor/supervisor-start/modules/supervisor-interactive-boot-contract/supervisor-interactive-boot-contract.module.code.ts"
import { armForceExitTimer } from "akasha/agent/seat/supervisor/supervisor-stop/modules/supervisor-lifecycle/supervisor-lifecycle.module.code.ts"
import { isPendingReExec } from "akasha/agent/seat/supervisor-restart/modules/state/supervisor-restart-state.module.code.ts"

export async function finalizeInteractiveExit(args: {
  agentProc: AgentProcess | undefined
  proxy: InteractiveSessionBoot["proxy"]
}): Promise<void> {
  const { agentProc, proxy } = args
  const disarmCleanupBackstop = armForceExitTimer("post-loop-cleanup")
  try {
    agentProc?.stopSessionWatch?.()

    if (!isPendingReExec()) {
      proxy.stop()
      setOAuthProxyHandle(null)
    }

    if (agentProc) await processCleanup(agentProc)
  } finally {
    disarmCleanupBackstop()
  }
}
