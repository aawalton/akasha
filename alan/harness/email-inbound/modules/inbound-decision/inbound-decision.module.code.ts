import type {
  Decision,
  InboundMessage,
} from "akasha/alan/harness/email-inbound/modules/inbound-message/inbound-message.module.code.ts"

export function decide(input: InboundMessage): Decision {
  if (input.addressedAgentHandle !== undefined) {
    if (!input.isSent && input.senderHandler !== undefined) {
      return {
        action: "agent-handle",
        agentHandle: input.senderHandler,
        reason: `addressed to ${input.addressedAgentHandle}'s channel by a sender handed to ${input.senderHandler}: hand to ${input.senderHandler}`,
      }
    }
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
