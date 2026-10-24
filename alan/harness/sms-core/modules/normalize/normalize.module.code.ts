import type {
  CommsInput,
  SmsRouteDecision,
} from "akasha/alan/harness/sms-core/modules/sms-identity/sms-identity.module.code.ts"
import type { TelnyxInboundSms } from "akasha/alan/harness/sms-core/modules/telnyx-inbound/telnyx-inbound.module.code.ts"

export function inboundToCommsInput(sms: TelnyxInboundSms): CommsInput {
  return {
    sender: sms.fromNumber.trim().toLowerCase(),
    content: sms.text,
  }
}

export interface RefusedInbound {
  readonly sender: string
  readonly accountUserId: string | null
  readonly attemptedTarget: string | null
  readonly reason: string
  readonly words: string
}

export function formatRefusalNotice(refusal: RefusedInbound): string {
  const account = refusal.accountUserId ?? "(none — matched no enrolled identity)"
  const destination = refusal.attemptedTarget ?? "(none — no handler is recorded for this sender)"
  return [
    "🚫 SMS refused — no seat took it, so its words are kept here",
    "",
    `sender ${refusal.sender}`,
    `account ${account}`,
    `destination ${destination}`,
    `reason ${refusal.reason}`,
    "",
    refusal.words,
    "",
    "— inbound SMS channel",
  ].join("\n")
}

export interface DiscardedInbound {
  readonly sender: string
  readonly reason: string
}

export function wordsOf(sms: TelnyxInboundSms): string {
  const said = sms.text.trim().length > 0 ? [sms.text] : []
  const media = sms.media.map((one) => `🖼 ${one.contentType ?? "media"} ${one.url}`)
  return said.length + media.length > 0 ? [...said, ...media].join("\n") : "(no text body)"
}

export function formatSmsSurface(sms: TelnyxInboundSms, decision: SmsRouteDecision): string {
  const routedNote =
    decision.kind === "helper"
      ? `routed to ${decision.target} (${decision.reason})`
      : `routed (${decision.reason})`
  const identityNote =
    decision.kind === "helper" && decision.accountUserId !== null
      ? `\nacting for account ${decision.accountUserId}`
      : ""
  const body = wordsOf(sms)
  const sender =
    decision.kind === "helper" && decision.person !== null
      ? `${decision.person} (${sms.fromNumber})`
      : sms.fromNumber
  return `📱 SMS from ${sender}\n\n${body}\n\n— inbound SMS channel · ${routedNote}${identityNote}`
}
