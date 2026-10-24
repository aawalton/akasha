import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  type RestartNoticePlan,
  restartNoticePlan,
} from "akasha/agent/seat/supervisor/seat-agent-restart/modules/supervisor-resume-asks/supervisor-resume-asks.module.code.ts"
import { withTimeout } from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-iteration-outcome-db/supervisor-iteration-outcome-db.module.code.ts"
import type { LoopState } from "akasha/agent/seat/supervisor/seat-agent-run/modules/supervisor-loop-state/supervisor-loop-state.module.code.ts"
import { REFUSAL_SAID } from "akasha/agent/seat/supervisor/supervisor-action/modules/regret-cut/regret-cut.module.code.ts"
import {
  holdReplies,
  takenBack,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/regret-taking/regret-taking.module.code.ts"
import { clearRequestedAction } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-clear/supervisor-agent-action-clear.module.code.ts"
import type { AgentActionEvent } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import { isPendingReExec } from "akasha/agent/seat/supervisor-restart/modules/state/supervisor-restart-state.module.code.ts"

type LoopDirective = "continue" | "break"

type ActionEventOf<K extends AgentActionEvent["action"]> = Extract<AgentActionEvent, { action: K }>

function restartFirstTurn(plan: RestartNoticePlan): string {
  return plan.route === "spawn-argv" ? plan.notice : ""
}

async function clearedTwice(agentId: string, action: string): Promise<void> {
  try {
    try {
      await withTimeout(clearRequestedAction(agentId), "clearRequestedAction")
    } catch {
      await withTimeout(clearRequestedAction(agentId), "clearRequestedAction (retry)")
    }
  } catch (err) {
    console.error(`${LOG} Failed to finalize ${action}:`, err)
  }
}

export async function handleRegret(
  event: ActionEventOf<"regret">,
  state: LoopState
): Promise<LoopDirective> {
  const agentId = state.getAgentId()
  try {
    const took =
      event.cut === null
        ? ({ refused: "absent" } as const)
        : await takenBack(agentId, event.messageId, event.cut)
    console.log(
      "refused" in took
        ? `${LOG} regret of ${event.messageId} left the transcript whole: ${REFUSAL_SAID[took.refused]}`
        : `${LOG} regret of ${event.messageId} cut the transcript at ${took.cut}`
    )
  } catch (err) {
    console.error(`${LOG} regret of ${event.messageId} failed:`, err)
  } finally {
    holdReplies(false)
  }
  await clearedTwice(agentId, "regret")
  if (isPendingReExec()) {
    console.log(`${LOG} regret + self-heal pending — exiting runInteractive to re-exec`)
    return "break"
  }
  console.log(`${LOG} regret — resuming session ${state.getSessionId()} with no prompt`)
  state.setResume({
    resume: true,
    driver: state.headless ? "awaiting-inbound" : "operator-prompt",
  })
  state.setCurrentPrompt("")
  return "continue"
}

export async function handleRestartNow(
  event: ActionEventOf<"restart-now">,
  maintenance: boolean,
  state: LoopState
): Promise<LoopDirective> {
  const agentId = state.getAgentId()
  const sessionId = state.getSessionId()
  const reExecPending = isPendingReExec()
  const plan = restartNoticePlan({
    event: { action: event.action, interruptMessage: event.interruptMessage },
    ctx: { maintenance, reExecPending },
  })
  await clearedTwice(agentId, "restart-now")
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
