import type { DiscardedInbound } from "../normalize/normalize.module.code.ts"
import { bytesToBase64 } from "../verify-signature/verify-signature.module.test-fixtures.ts"
import type {
  DeliverEffect,
  DeliveryKind,
  RecordDiscardEffect,
} from "./handle-inbound.module.code.ts"

function toKeyPair(key: CryptoKey | CryptoKeyPair): CryptoKeyPair {
  if ("privateKey" in key) return key
  throw new Error("expected a CryptoKeyPair")
}

export async function genKeypair(): Promise<{ privateKey: CryptoKey; publicKeyBase64: string }> {
  const kp = toKeyPair(
    await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"])
  )
  const rawPublic = new Uint8Array(await crypto.subtle.exportKey("raw", kp.publicKey))
  return { privateKey: kp.privateKey, publicKeyBase64: bytesToBase64(rawPublic) }
}

export async function sign(
  privateKey: CryptoKey,
  timestamp: string,
  rawBody: string
): Promise<string> {
  const message = new TextEncoder().encode(`${timestamp}|${rawBody}`)
  const sig = new Uint8Array(await crypto.subtle.sign({ name: "Ed25519" }, privateKey, message))
  return bytesToBase64(sig)
}

export const SAMPLE_SENDER = "+18015551234"
export const SAMPLE_SENDER_DIGITS = "8015551234"

export function sampleBody(
  text = "hello amy",
  eventType = "message.received",
  direction = "inbound"
): string {
  return JSON.stringify({
    data: {
      event_type: eventType,
      id: "evt-abc123",
      payload: {
        direction,
        id: "msg-def456",
        from: { phone_number: SAMPLE_SENDER, carrier: "Test", line_type: "Wireless" },
        to: [{ phone_number: "+18885550000", status: "webhook_delivered" }],
        text,
        type: "SMS",
      },
    },
    meta: { attempt: 1 },
  })
}

export interface DeliveryCall {
  readonly target: string
  readonly content: string
  readonly kind: DeliveryKind
}

export function recordingDeliver(seatless: readonly string[] = []): {
  deliver: DeliverEffect
  calls: readonly DeliveryCall[]
} {
  const calls: DeliveryCall[] = []
  return {
    calls,
    deliver: async (target, content, kind) => {
      calls.push({ target, content, kind })
      if (seatless.includes(target)) {
        return { kind: "no-such-seat", reason: `no agent row is named '${target}'` }
      }
      return { kind: "landed" }
    },
  }
}

export function recordingDiscards(failWith?: string): {
  recordDiscard: RecordDiscardEffect
  discards: readonly DiscardedInbound[]
} {
  const discards: DiscardedInbound[] = []
  return {
    discards,
    recordDiscard: async (discard) => {
      discards.push(discard)
      return failWith === undefined
        ? { kind: "recorded" }
        : { kind: "not-recorded", reason: failWith }
    },
  }
}

export const neverDiscard: RecordDiscardEffect = async (discard) => {
  throw new Error(`unexpected discard of ${discard.sender}: ${discard.reason}`)
}

export function messagesOnly(
  calls: readonly DeliveryCall[]
): readonly { target: string; content: string }[] {
  return calls.filter((c) => c.kind === "inbound-message")
}
