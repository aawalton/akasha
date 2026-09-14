import type { Message } from "akasha/alan/google/email/modules/gmail-mailbox/gmail-mailbox.module.code.ts"
import {
  SENT_LABEL,
  SPAM_LABEL,
} from "akasha/alan/google/email/modules/gmail-messages/gmail-messages.module.code.ts"
import { matchAgentChannel } from "akasha/alan/harness/email-inbound/modules/agent-channel/agent-channel.module.code.ts"
import type { InboundMessage } from "akasha/alan/harness/email-inbound/modules/inbound-message/inbound-message.module.code.ts"
import { parseSender } from "akasha/alan/harness/email-inbound/modules/sender/sender.module.code.ts"

export function buildInboundMessage(
  message: Message,
  selfAddress: string,
  channels: ReadonlyMap<string, string>
): InboundMessage {
  return {
    from: message.from,
    fromAddress: message.fromAddress,
    fromDomain: parseSender(message.from).domain,
    subject: message.subject,
    to: message.to,
    isFromSelf: message.fromAddress === selfAddress.toLowerCase(),
    addressedAgentHandle: matchAgentChannel(channels, message.to, message.cc),
    hasListUnsubscribe: message.unsubscribe !== "",
    isSpam: message.labelIds.includes(SPAM_LABEL),
    isSent: message.labelIds.includes(SENT_LABEL),
  }
}
