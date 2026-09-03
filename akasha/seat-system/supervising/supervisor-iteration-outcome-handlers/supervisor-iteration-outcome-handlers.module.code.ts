import { clearRequestedAction } from "@akasha/seat-system/supervisor-agent-action-clear"
import type { AgentActionEvent } from "@akasha/seat-system/supervisor-agent-action-types"
import { LOG } from "@akasha/seat-system/supervisor-config"
import { withTimeout } from "@akasha/seat-system/supervisor-iteration-outcome-db"
import type { LoopState } from "@tools/lib/supervisor-loop-state"
import { askRestartNotice, type RestartNoticePlan } from "@tools/lib/supervisor-resume-asks"
import { isPendingReExec } from "@tools/lib/supervisor-self-heal-state"

type LoopDirective = "continue" | "break"

type ActionEventOf<K extends AgentActionEvent["action"]> = Extract<AgentActionEvent, { action: K }>

export function restartFirstTurn(plan: RestartNoticePlan): string {
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
