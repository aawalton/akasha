export const SENDER_FOOTER_MARKER = "— inbound web channel"

export interface InboundSender {
  readonly accountUserId: string
  readonly personSlug: string | null
}

export function withSenderFooter(body: string, sender: InboundSender, channel: string): string {
  const who =
    sender.personSlug === null
      ? `account ${sender.accountUserId}`
      : `${sender.personSlug} (account ${sender.accountUserId})`
  return `${body}\n\n${SENDER_FOOTER_MARKER} · ${channel} · from ${who}`
}
