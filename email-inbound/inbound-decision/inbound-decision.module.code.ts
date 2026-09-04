import type { Decision, InboundMessage } from "../inbound-message/inbound-message.module.code.ts"

export function decide(input: InboundMessage): Decision {
  if (input.addressedAgentHandle !== undefined) {
    if (!input.isSent) {
      return {
        action: "discard",
        agentHandle: undefined,
        reason: `addressed to ${input.addressedAgentHandle}'s channel but not sent by the watched account: discard (whitelist)`,
      }
    }
    return {
      action: "agent-handle",
      agentHandle: input.addressedAgentHandle,
      reason: `addressed to ${input.addressedAgentHandle}'s channel by Alan (SENT): hand to ${input.addressedAgentHandle}`,
    }
  }

  return {
    action: "surface",
    agentHandle: undefined,
    reason: "not addressed to a persona channel: surface it",
  }
}
