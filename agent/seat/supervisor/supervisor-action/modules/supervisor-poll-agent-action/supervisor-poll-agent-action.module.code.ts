import { LOG } from "akasha/agent/seat/supervisor/modules/supervisor-config/supervisor-config.module.code.ts"
import { controlOf } from "akasha/agent/seat/supervisor/supervisor-action/modules/seat-control/seat-control.module.code.ts"
import type { AgentActionEvent } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-agent-action-types/supervisor-agent-action-types.module.code.ts"
import { regret } from "akasha/agent/seat/supervisor/supervisor-action/pages/regret.supervisor-action.ts"
import { restart } from "akasha/agent/seat/supervisor/supervisor-action/pages/restart.supervisor-action.ts"
import { restartNow } from "akasha/agent/seat/supervisor/supervisor-action/pages/restart-now.supervisor-action.ts"
import { swapGateway } from "akasha/agent/seat/supervisor/supervisor-action/pages/swap-gateway.supervisor-action.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const ACTIONS: readonly AgentActionEvent["action"][] = [
  restart.slug,
  restartNow.slug,
  swapGateway.slug,
  regret.slug,
]

function actionOf(value: unknown): AgentActionEvent["action"] | null {
  if (typeof value !== "string") return null
  const named = slugOf(value)
  return ACTIONS.find((one) => one === named) ?? null
}

function extractAgentAction(attrs: Record<string, unknown> | null): AgentActionEvent | null {
  const action = actionOf(attrs?.requestedAction)
  if (action === null) return null
  if (action === "swap-gateway") return { action }
  if (action === "regret") {
    const messageId = typeof attrs?.regrettedMessage === "string" ? attrs.regrettedMessage : ""
    return { action, messageId, cut: null }
  }
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

export const REGRET_TICK_MS = 1_000

export function startRegretWatch(args: {
  readonly getAgentId: () => string | null
  readonly deliver: (event: AgentActionEvent) => void | Promise<void>
  readonly tickMs?: number
  readonly read?: (agentId: string) => Promise<AgentActionEvent | null>
}): { readonly stop: () => void } {
  const read = args.read ?? readAgentAction
  let reading = false
  const tick = async (): Promise<undefined> => {
    if (reading) return
    const agentId = args.getAgentId()
    if (agentId === null || agentId === "") return
    reading = true
    try {
      const event = await read(agentId)
      if (event?.action === regret.slug) await args.deliver(event)
    } catch (err) {
      console.error(`${LOG} regret watch: reading agent ${agentId} failed:`, err)
    } finally {
      reading = false
    }
  }
  const timer = setInterval(() => void tick(), args.tickMs ?? REGRET_TICK_MS)
  return { stop: () => clearInterval(timer) }
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
