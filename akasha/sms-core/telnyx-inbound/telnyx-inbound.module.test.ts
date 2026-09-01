import { describe, expect, test } from "bun:test"
import { extractInboundSms, telnyxWebhookSchema } from "./telnyx-inbound.module.code.ts"

function payload(extra: Record<string, unknown> = {}): unknown {
  return {
    data: {
      event_type: "message.received",
      id: "evt-1",
      payload: {
        from: { phone_number: "+18015551234" },
        ...extra,
      },
    },
  }
}

describe("telnyxWebhookSchema", () => {
  test("refuses an envelope carrying no sender", () => {
    const parsed = telnyxWebhookSchema.safeParse({
      data: { event_type: "message.received", id: "evt-1", payload: {} },
    })
    expect(parsed.success).toBe(false)
  })

  test("takes an envelope carrying nothing but a sender", () => {
    expect(telnyxWebhookSchema.safeParse(payload()).success).toBe(true)
  })

  test("carries through a field the shape does not name", () => {
    const parsed = telnyxWebhookSchema.safeParse(payload({ webhook_url: "https://example.test" }))
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    expect(parsed.data.data.payload).toHaveProperty("webhook_url")
  })
})

describe("extractInboundSms", () => {
  test("reads a missing text body as empty text", () => {
    const parsed = telnyxWebhookSchema.parse(payload())
    expect(extractInboundSms(parsed).text).toBe("")
  })

  test("reads a missing direction as unknown", () => {
    const parsed = telnyxWebhookSchema.parse(payload())
    expect(extractInboundSms(parsed).direction).toBe(null)
  })

  test("reads a missing message id as unknown", () => {
    const parsed = telnyxWebhookSchema.parse(payload())
    expect(extractInboundSms(parsed).messageId).toBe(null)
  })

  test("lifts the sender out of the envelope", () => {
    const parsed = telnyxWebhookSchema.parse(payload({ text: "hi", direction: "inbound" }))
    const sms = extractInboundSms(parsed)
    expect(sms.fromNumber).toBe("+18015551234")
    expect(sms.eventType).toBe("message.received")
    expect(sms.eventId).toBe("evt-1")
  })

  test("lifts every recipient the envelope names", () => {
    const parsed = telnyxWebhookSchema.parse(
      payload({ to: [{ phone_number: "+18885550000" }, { phone_number: "+18885550001" }] })
    )
    expect(extractInboundSms(parsed).toNumbers).toEqual(["+18885550000", "+18885550001"])
  })

  test("answers no recipients where the envelope names none", () => {
    const parsed = telnyxWebhookSchema.parse(payload())
    expect(extractInboundSms(parsed).toNumbers).toEqual([])
  })
})
