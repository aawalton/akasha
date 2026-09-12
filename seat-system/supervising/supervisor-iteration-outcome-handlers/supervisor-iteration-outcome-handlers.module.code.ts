import { withTimeout } from "akasha/agents/seats/supervisors/modules/iteration-outcome-db/supervisor-iteration-outcome-db.module.code.ts"
import { isPendingReExec } from "akasha/seat-system/self-healing/supervisor-self-heal-state/supervisor-self-heal-state.module.code.ts"
import { clearRequestedAction } from "akasha/seat-system/supervising/supervisor-agent-action-clear/supervisor-agent-action-clear.module.code.ts"
import type { AgentActionEvent } from "akasha/seat-system/supervising/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import { LOG } from "akasha/seat-system/supervising/supervisor-config/supervisor-config.module.code.ts"
import type { LoopState } from "akasha/seat-system/supervising/supervisor-loop-state/supervisor-loop-state.module.code.ts"
import {
  askRestartNotice,
  type RestartNoticePlan,
} from "akasha/seat-system/supervising/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"

type LoopDirective = "continue" | "break"

type ActionEventOf<K extends AgentActionEvent["action"]> = Extract<AgentActionEvent, { action: K }>

function restartFirstTurn(plan: RestartNoticePlan): string {
  return plan.route === "spawn-argv" ? plan.notice : ""
}

export async function handleRestartNow(
  event: ActionEventOf<"restart-now">,
  maintenance: boolean,
  state: LoopState
): Promise<LoopDirective> {
  const agentId = state.getAgentId()
  const sessionId = state.getSessionId()
  const reExecPending = isPendingReExec()
  const plan = await askRestartNotice({
    event: { action: event.action, interruptMessage: event.interruptMessage },
    ctx: { maintenance, reExecPending },
  })
  try {
    try {
      await withTimeout(clearRequestedAction(agentId), "clearRequestedAction")
    } catch {
      await withTimeout(clearRequestedAction(agentId), "clearRequestedAction (retry)")
    }
  } catch (err) {
    console.error(`${LOG} Failed to finalize restart-now:`, err)
  }
  if (reExecPending) {
    console.log(`${LOG} restart-now + self-heal pending — exiting runInteractive to re-exec`)
    return "break"
  }
  console.log(`${LOG} restart-now — resuming session ${sessionId}`)
  state.setResume({
    resume: true,
    driver: plan.route === "rail" ? "deferred-notice" : "argv-prompt",
  })
  state.setCurrentPrompt(restartFirstTurn(plan))
  return "continue"
}
