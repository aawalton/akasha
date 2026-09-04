import type { CommsInput, SmsRouteDecision } from "../sms-identity/sms-identity.module.code.ts"
import type { TelnyxInboundSms } from "../telnyx-inbound/telnyx-inbound.module.code.ts"

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
}

export function formatRefusalNotice(refusal: RefusedInbound): string {
  const account = refusal.accountUserId ?? "(none — matched no enrolled identity)"
  const destination = refusal.attemptedTarget ?? "(none — no handler is recorded for this sender)"
  return [
    "🚫 SMS refused — nothing was delivered",
    "",
    `sender ${refusal.sender}`,
    `account ${account}`,
    `destination ${destination}`,
    `reason ${refusal.reason}`,
    "",
    "— inbound SMS channel · the sender's message is deliberately not carried here",
  ].join("\n")
}

export interface DiscardedInbound {
  readonly sender: string
  readonly reason: string
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
  const body = sms.text.trim().length > 0 ? sms.text : "(no text body)"
  return `📱 SMS from ${sms.fromNumber}\n\n${body}\n\n— inbound SMS channel · ${routedNote}${identityNote}`
}
