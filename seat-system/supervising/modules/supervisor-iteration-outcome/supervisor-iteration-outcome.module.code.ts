import type { PendingAgentAction } from "akasha/agents/seats/supervisors/modules/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import { handleRestartNow } from "akasha/seat-system/supervising/modules/supervisor-iteration-outcome-handlers/supervisor-iteration-outcome-handlers.module.code.ts"
import type { LoopState } from "akasha/seat-system/supervising/modules/supervisor-loop-state/supervisor-loop-state.module.code.ts"

export type LoopDirective = "continue" | "break"

export async function dispatchPostExitOutcome(
  pending: PendingAgentAction | null,
  state: LoopState
): Promise<LoopDirective> {
  if (pending === null) return "break"
  const { event } = pending
  if (event.action === "restart-now") {
    return handleRestartNow(event, pending.maintenance, state)
  }
  return "break"
}
