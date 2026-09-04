import { describe, expect, test } from "bun:test"
import { buildTelnyxSendRequest, parseTelnyxSendResponse } from "./telnyx-send.module.code.ts"

const ARGS = {
  apiKey: "test-key-not-a-secret",
  from: "+18885550000",
  to: "+18015551234",
  text: "hello",
}

describe("buildTelnyxSendRequest", () => {
  test("aims at the Telnyx messages endpoint where no base is given", () => {
    expect(buildTelnyxSendRequest(ARGS).url).toBe("https://api.telnyx.com/v2/messages")
  })

  test("lets a caller point the request somewhere else", () => {
    const request = buildTelnyxSendRequest({ ...ARGS, baseUrl: "https://stub.test" })
    expect(request.url).toBe("https://stub.test/v2/messages")
  })

  test("puts the api key in the authorization header", () => {
    expect(buildTelnyxSendRequest(ARGS).headers.Authorization).toBe("Bearer test-key-not-a-secret")
  })

  test("keeps the api key out of the body", () => {
    expect(buildTelnyxSendRequest(ARGS).body).not.toContain("test-key-not-a-secret")
  })

  test("carries sender and recipient and text in the body", () => {
    expect(JSON.parse(buildTelnyxSendRequest(ARGS).body)).toEqual({
      from: "+18885550000",
      to: "+18015551234",
      text: "hello",
    })
  })

  test("posts", () => {
    expect(buildTelnyxSendRequest(ARGS).method).toBe("POST")
  })
})

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
