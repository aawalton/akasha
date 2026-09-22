import { controlOf } from "akasha/agent/seat/supervisor/supervisor-action/modules/seat-control/seat-control.module.code.ts"
import type { AgentActionEvent } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import { LOG } from "akasha/agent/seat/supervisor/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ACTIONS: readonly AgentActionEvent["action"][] = ["restart", "restart-now", "swap-gateway"]

function actionOf(value: unknown): AgentActionEvent["action"] | null {
  if (typeof value !== "string") return null
  const named = slugOf(value)
  return ACTIONS.find((one) => one === named) ?? null
}

function extractAgentAction(attrs: Record<string, unknown> | null): AgentActionEvent | null {
  const action = actionOf(attrs?.requestedAction)
  if (action === null) return null
  if (action === "swap-gateway") return { action }
  const interruptMessage =
    typeof attrs?.interruptMessage === "string" ? attrs.interruptMessage : null
  if (action === "restart-now") return { action, interruptMessage }
  const restartArmedAt = typeof attrs?.restartArmedAt === "number" ? attrs.restartArmedAt : null
  return { action, interruptMessage, restartArmedAt }
}

async function readAgentAction(agentId: string): Promise<AgentActionEvent | null> {
  try {
    return extractAgentAction(controlOf(agentId))
  } catch (err) {
    console.error(`${LOG} action poll: reading agent ${agentId} failed:`, err)
    return null
  }
}

export async function pollAgentAction(
  getAgentId: () => string | null,
  deliver: (event: AgentActionEvent) => void | Promise<void>
): Promise<void> {
  const agentId = getAgentId()
  if (agentId === null || agentId === "") return
  const event = await readAgentAction(agentId)
  if (event === null) return
  await deliver(event)
}
