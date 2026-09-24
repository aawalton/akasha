import { describe, expect, test } from "bun:test"
import {
  extractInboundSms,
  telnyxWebhookSchema,
} from "akasha/alan/harness/sms-core/modules/telnyx-inbound/telnyx-inbound.module.code.ts"

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

  test("lifts every picture a message carries with the type it names", () => {
    const parsed = telnyxWebhookSchema.parse(
      payload({
        media: [
          { url: "https://media.test/one.jpeg", content_type: "image/jpeg", size: 1 },
          { url: "https://media.test/two" },
        ],
      })
    )
    expect(extractInboundSms(parsed).media).toEqual([
      { url: "https://media.test/one.jpeg", contentType: "image/jpeg" },
      { url: "https://media.test/two", contentType: null },
    ])
  })

  test("answers no media where the envelope carries none", () => {
    const parsed = telnyxWebhookSchema.parse(payload())
    expect(extractInboundSms(parsed).media).toEqual([])
  })
})
