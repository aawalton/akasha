import {
  controlOf,
  setControl,
} from "akasha/agent/seat/supervisor/supervisor-action/modules/seat-control/seat-control.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const ACTION_PAGE_TYPE = "supervisor-action"

const DEFAULT_TIMEOUT_MS = 30_000

const DEFAULT_POLL_MS = 500

type AgentActionRequest =
  | { action: "restart-now"; interruptMessage?: string }
  | { action: "restart"; interruptMessage?: string }
  | { action: "swap-gateway"; interruptMessage?: never }

type ActionAckOutcome =
  | { readonly ok: true }
  | {
      readonly ok: false
      readonly reason: {
        readonly agentId: string
        readonly timeoutMs: number
        readonly lastRequestedAction: string | null
      }
    }

type AckVerb = "restart" | "swap-gateway"

type AckTimeoutReason = Extract<ActionAckOutcome, { ok: false }>["reason"]

export function describeAckTimeout(verb: AckVerb, reason: AckTimeoutReason): string {
  return (
    `${verb}: the supervisor did not take up requestedAction within ${reason.timeoutMs}ms ` +
    `(agentId=${reason.agentId}, lastRequestedAction=${reason.lastRequestedAction ?? "null"}). ` +
    "The supervisor's channel is closed or its process is gone, both of which its recent log names."
  )
}

function buildRequestedActionSet(
  request: AgentActionRequest,
  armedAtMs?: number
): Record<string, unknown> {
  const set: Record<string, unknown> = {
    requestedAction: namedAs(ACTION_PAGE_TYPE, request.action, null),
  }
  if (request.interruptMessage != null) set.interruptMessage = request.interruptMessage
  if (request.action === "restart" && armedAtMs != null) {
    set.restartArmedAt = armedAtMs
  }
  return set
}

export async function setRequestedAction(
  agentId: string,
  request: AgentActionRequest
): Promise<void> {
  setControl(
    agentId,
    buildRequestedActionSet(request, request.action === "restart" ? Date.now() : undefined)
  )
}

export async function waitForActionCleared(
  agentId: string,
  opts: { timeoutMs?: number; pollMs?: number } = {}
): Promise<ActionAckOutcome> {
  const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS
  const pollMs = opts.pollMs ?? DEFAULT_POLL_MS
  const deadline = Date.now() + timeoutMs
  while (true) {
    const held = controlOf(agentId)
    if (held === null) {
      throw new Error(`waitForActionCleared: no seat page stands for agent ${agentId} to answer`)
    }
    const lastRequestedAction = textIn(held.requestedAction)
    if (lastRequestedAction === null) return { ok: true }
    if (Date.now() >= deadline) {
      return { ok: false, reason: { agentId, timeoutMs, lastRequestedAction } }
    }
    await new Promise((resolve) => setTimeout(resolve, pollMs))
  }
}
