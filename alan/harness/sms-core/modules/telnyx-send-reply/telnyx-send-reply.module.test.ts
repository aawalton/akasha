import { describe, expect, test } from "bun:test"
import { parseTelnyxSendResponse } from "akasha/alan/harness/sms-core/modules/telnyx-send-reply/telnyx-send-reply.module.code.ts"

describe("parseTelnyxSendResponse", () => {
  test("reads the id out of a good answer", () => {
    expect(parseTelnyxSendResponse({ data: { id: "msg-1" } })).toEqual({ ok: true, id: "msg-1" })
  })

  test("reports an answer the shape refuses rather than throwing", () => {
    expect(parseTelnyxSendResponse({ data: {} })).toEqual({
      ok: false,
      reason: "invalid-send-response",
    })
  })

  test("reports nothing at all rather than throwing", () => {
    expect(parseTelnyxSendResponse(null).ok).toBe(false)
  })
})
