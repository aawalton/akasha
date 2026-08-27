import { describe, expect, test } from "bun:test"
import { extractInboundSms, telnyxWebhookSchema } from "./telnyx-inbound"

const validWebhook = {
  data: {
    event_type: "message.received",
    id: "evt-1",
    payload: {
      direction: "inbound",
      id: "msg-1",
      from: { phone_number: "+18015551234", carrier: "X", line_type: "Wireless" },
      to: [{ phone_number: "+18885550000", status: "webhook_delivered" }],
      text: "hi",
      type: "SMS",
      future_field: "kept",
    },
  },
  meta: { attempt: 1 },
}

describe("telnyxWebhookSchema", () => {
  test("parses a valid inbound webhook and preserves unknown keys", () => {
    const parsed = telnyxWebhookSchema.safeParse(validWebhook)
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.data.payload.future_field).toBe("kept")
    }
  })

  test("rejects a payload missing from.phone_number", () => {
    const bad = {
      data: { event_type: "message.received", id: "e", payload: { to: [], text: "x" } },
    }
    expect(telnyxWebhookSchema.safeParse(bad).success).toBe(false)
  })

  test("rejects a non-object", () => {
    expect(telnyxWebhookSchema.safeParse("nope").success).toBe(false)
    expect(telnyxWebhookSchema.safeParse(null).success).toBe(false)
  })
})

describe("extractInboundSms", () => {
  test("projects the router-facing fields", () => {
    const parsed = telnyxWebhookSchema.parse(validWebhook)
    const sms = extractInboundSms(parsed)
    expect(sms.eventType).toBe("message.received")
    expect(sms.eventId).toBe("evt-1")
    expect(sms.messageId).toBe("msg-1")
    expect(sms.direction).toBe("inbound")
    expect(sms.fromNumber).toBe("+18015551234")
    expect(sms.toNumbers).toEqual(["+18885550000"])
    expect(sms.text).toBe("hi")
  })

  test("defaults text to empty string when absent", () => {
    const parsed = telnyxWebhookSchema.parse({
      data: {
        event_type: "message.received",
        id: "e",
        payload: { from: { phone_number: "+1555" } },
      },
    })
    expect(extractInboundSms(parsed).text).toBe("")
    expect(extractInboundSms(parsed).toNumbers).toEqual([])
  })
})
