import { matchAgentChannel } from "@alanwalton/email-inbound/recipients"
import { parseSender } from "@alanwalton/email-inbound/sender"
import { type InboundMessage } from "@alanwalton/email-inbound/types"
import type { GmailClient } from "./client"
import { getRawMessage, SENT_LABEL, SPAM_LABEL } from "./messages"
import { getHeader } from "./schema"

export function isSpamLabeled(labelIds: readonly string[] | undefined): boolean {
  return (labelIds ?? []).includes(SPAM_LABEL)
}

export function isSentLabeled(labelIds: readonly string[] | undefined): boolean {
  return (labelIds ?? []).includes(SENT_LABEL)
}

export async function buildInboundMessage(
  client: GmailClient,
  messageId: string,
  selfAddress: string,
  channels: ReadonlyMap<string, string>
): Promise<InboundMessage> {
  const message = await getRawMessage(client, messageId)
  const from = getHeader(message, "From") ?? ""
  const to = getHeader(message, "To")
  const cc = getHeader(message, "Cc")
  const subject = getHeader(message, "Subject")
  const listUnsubscribe = getHeader(message, "List-Unsubscribe")
  const { address, domain } = parseSender(from)
  return {
    from,
    fromAddress: address,
    fromDomain: domain,
    subject: subject ?? "",
    to: to ?? "",
    isFromSelf: address === selfAddress.toLowerCase(),
    addressedAgentHandle: matchAgentChannel(channels, to, cc),
    hasListUnsubscribe: listUnsubscribe !== undefined,
    isSpam: isSpamLabeled(message.labelIds),
    isSent: isSentLabeled(message.labelIds),
  }
}
