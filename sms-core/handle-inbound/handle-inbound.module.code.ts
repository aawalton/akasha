import {
  type DiscardedInbound,
  formatRefusalNotice,
  formatSmsSurface,
  inboundToCommsInput,
  type RefusedInbound,
} from "../normalize/normalize.module.code.ts"
import {
  decideSmsRoute,
  type SmsExternalIdentity,
} from "../sms-identity/sms-identity.module.code.ts"
import {
  extractInboundSms,
  telnyxWebhookSchema,
} from "../telnyx-inbound/telnyx-inbound.module.code.ts"
import { verifyTelnyxSignature } from "../verify-signature/verify-signature.module.code.ts"

const ALAN_HANDLER_SEAT = "alan"

export type DeliveryKind = "inbound-message" | "refusal-notice"

export type DeliverResult =
  | { readonly kind: "landed" }
  | { readonly kind: "no-such-seat"; readonly reason: string }

export type DeliverEffect = (
  targetAgent: string,
  content: string,
  kind: DeliveryKind
) => Promise<DeliverResult>

export type RecordResult =
  | { readonly kind: "recorded" }
  | { readonly kind: "not-recorded"; readonly reason: string }

export type RecordDiscardEffect = (discard: DiscardedInbound) => Promise<RecordResult>

export type InboundOutcome =
  | { readonly kind: "rejected"; readonly status: number; readonly reason: string }
  | { readonly kind: "ignored"; readonly reason: string }
  | { readonly kind: "dropped"; readonly reason: string }
  | { readonly kind: "discarded"; readonly reason: string }
  | { readonly kind: "routed"; readonly target: string; readonly reason: string }
  | { readonly kind: "refused"; readonly target: string | null; readonly reason: string }

export interface HandleInboundSmsArgs {
  readonly rawBody: string
  readonly signatureBase64: string | null
  readonly timestamp: string | null
  readonly publicKeyBase64: string
  readonly loadIdentities: () => Promise<readonly SmsExternalIdentity[]>
  readonly nowMs: number
  readonly toleranceSeconds?: number
}

export async function handleInboundSms(
  args: HandleInboundSmsArgs,
  deliver: DeliverEffect,
  recordDiscard: RecordDiscardEffect
): Promise<InboundOutcome> {
  const signature = await verifyTelnyxSignature({
    publicKeyBase64: args.publicKeyBase64,
    signatureBase64: args.signatureBase64,
    timestamp: args.timestamp,
    rawBody: args.rawBody,
    nowMs: args.nowMs,
    toleranceSeconds: args.toleranceSeconds,
  })
  if (!signature.ok) {
    return { kind: "rejected", status: 403, reason: `signature:${signature.reason}` }
  }

  let parsed: ReturnType<typeof telnyxWebhookSchema.safeParse>
  try {
    parsed = telnyxWebhookSchema.safeParse(JSON.parse(args.rawBody))
  } catch {
    return { kind: "rejected", status: 400, reason: "invalid-json" }
  }
  if (!parsed.success) {
    return { kind: "rejected", status: 400, reason: "invalid-payload" }
  }

  const sms = extractInboundSms(parsed.data)
  if (sms.eventType !== "message.received") {
    return { kind: "ignored", reason: `non-inbound-event:${sms.eventType}` }
  }
  if (sms.direction !== null && sms.direction !== "inbound") {
    return { kind: "ignored", reason: `non-inbound-direction:${sms.direction}` }
  }

  const identities = await args.loadIdentities()
  const decision = decideSmsRoute(inboundToCommsInput(sms), identities)
  if (decision.kind === "drop") {
    return { kind: "dropped", reason: decision.reason }
  }
  if (decision.kind === "discard") {
    const record = await recordDiscard({ sender: decision.sender, reason: decision.reason })
    const uncounted =
      record.kind === "recorded" ? "" : ` (the discard was not recorded: ${record.reason})`
    return { kind: "discarded", reason: `${decision.reason}${uncounted}` }
  }
  if (decision.kind === "refuse") {
    return await refuse(deliver, {
      sender: sms.fromNumber,
      accountUserId: decision.accountUserId,
      attemptedTarget: null,
      reason: decision.reason,
    })
  }

  const target = decision.target
  const landing = await deliver(target, formatSmsSurface(sms, decision), "inbound-message")
  if (landing.kind === "no-such-seat") {
    return await refuse(deliver, {
      sender: sms.fromNumber,
      accountUserId: decision.accountUserId,
      attemptedTarget: target,
      reason: landing.reason,
    })
  }
  return { kind: "routed", target, reason: decision.reason }
}

async function refuse(deliver: DeliverEffect, refusal: RefusedInbound): Promise<InboundOutcome> {
  const notice = await deliver(ALAN_HANDLER_SEAT, formatRefusalNotice(refusal), "refusal-notice")
  const unreported =
    notice.kind === "landed"
      ? ""
      : ` (the refusal notice to ${ALAN_HANDLER_SEAT} did not land: ${notice.reason})`
  return {
    kind: "refused",
    target: refusal.attemptedTarget,
    reason: `${refusal.reason}${unreported}`,
  }
}
