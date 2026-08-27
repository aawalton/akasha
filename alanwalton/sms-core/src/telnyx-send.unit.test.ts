import { describe, expect, test } from "bun:test"
import { buildTelnyxSendRequest, parseTelnyxSendResponse } from "./telnyx-send"

describe("buildTelnyxSendRequest", () => {
  test("builds a POST to /v2/messages with bearer auth and the from/to/text body", () => {
    const req = buildTelnyxSendRequest({
      apiKey: "KEY-secret",
      from: "+18885550000",
      to: "+18015551234",
      text: "On my way",
    })
    expect(req.url).toBe("https://api.telnyx.com/v2/messages")
    expect(req.method).toBe("POST")
    expect(req.headers.Authorization).toBe("Bearer KEY-secret")
    expect(req.headers["Content-Type"]).toBe("application/json")
    expect(req.body).toBe(
      JSON.stringify({ from: "+18885550000", to: "+18015551234", text: "On my way" })
    )
  })

  test("honors a base-url override (sandbox endpoint)", () => {
    const req = buildTelnyxSendRequest({
      apiKey: "k",
      from: "+1",
      to: "+2",
      text: "t",
      baseUrl: "https://sandbox.example.com",
    })
    expect(req.url).toBe("https://sandbox.example.com/v2/messages")
  })
})

describe("parseTelnyxSendResponse", () => {
  test("extracts the message id from a success envelope", () => {
    const parsed = parseTelnyxSendResponse({
      data: { id: "msg-9", direction: "outbound", type: "SMS" },
    })
    expect(parsed.ok).toBe(true)
    if (parsed.ok) expect(parsed.id).toBe("msg-9")
  })

  test("rejects a malformed response", () => {
    expect(parseTelnyxSendResponse({ data: {} }).ok).toBe(false)
    expect(parseTelnyxSendResponse({ error: "x" }).ok).toBe(false)
    expect(parseTelnyxSendResponse(null).ok).toBe(false)
  })
})
