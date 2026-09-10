import type { PendingAgentAction } from "akasha/seat-system/supervising/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import type { LoopState } from "akasha/seat-system/supervising/supervisor-loop-state/supervisor-loop-state.module.code.ts"
import { handleRestartNow } from "../supervisor-iteration-outcome-handlers/supervisor-iteration-outcome-handlers.module.code.ts"

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
