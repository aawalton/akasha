import { describe, expect, test } from "bun:test"
import {
  formatRefusalNotice,
  formatSmsSurface,
  inboundToCommsInput,
} from "akasha/alan/harness/sms-core/modules/normalize/normalize.module.code.ts"
import type { SmsRouteDecision } from "akasha/alan/harness/sms-core/modules/sms-identity/sms-identity.module.code.ts"
import type { TelnyxInboundSms } from "akasha/alan/harness/sms-core/modules/telnyx-inbound/telnyx-inbound.module.code.ts"

function sms(text: string): TelnyxInboundSms {
  return {
    eventId: "evt-1",
    eventType: "message.received",
    messageId: "msg-1",
    direction: "inbound",
    fromNumber: "+18015551234",
    toNumbers: ["+18885550000"],
    text,
    media: [],
  }
}

const PICTURE = { url: "https://media.test/one.jpeg", contentType: "image/jpeg" }

const HELPER: SmsRouteDecision = {
  kind: "helper",
  target: "amy",
  accountUserId: "acct-1",
  reason: "allowlisted sms identity → amy",
}

describe("inboundToCommsInput", () => {
  test("lower-cases the sender", () => {
    const input = inboundToCommsInput({ ...sms("hi"), fromNumber: " +1801ABC1234 " })
    expect(input.sender).toBe("+1801abc1234")
  })

  test("carries the message through untouched", () => {
    expect(inboundToCommsInput(sms("  Hello There  ")).content).toBe("  Hello There  ")
  })
})

describe("formatRefusalNotice", () => {
  test("carries no part of the message it refused", () => {
    const notice = formatRefusalNotice({
      sender: "+18015551234",
      accountUserId: "acct-1",
      attemptedTarget: "amy",
      reason: "no agent row is named 'amy'",
    })
    expect(notice).not.toContain("secret payload")
    expect(notice).toContain("+18015551234")
    expect(notice).toContain("amy")
  })

  test("names the want of an account where none was matched", () => {
    const notice = formatRefusalNotice({
      sender: "+18015551234",
      accountUserId: null,
      attemptedTarget: null,
      reason: "whatever",
    })
    expect(notice).toContain("matched no enrolled identity")
    expect(notice).toContain("no handler is recorded")
  })
})

describe("formatSmsSurface", () => {
  test("shows a message of nothing but space as having no body", () => {
    expect(formatSmsSurface(sms("   "), HELPER)).toContain("(no text body)")
  })

  test("shows a picture with no text as the picture rather than as no body", () => {
    const surface = formatSmsSurface({ ...sms(""), media: [PICTURE] }, HELPER)
    expect(surface).toContain("🖼 image/jpeg https://media.test/one.jpeg")
    expect(surface).not.toContain("(no text body)")
  })

  test("shows a picture beneath the text it came with", () => {
    const surface = formatSmsSurface({ ...sms("2x melon"), media: [PICTURE] }, HELPER)
    expect(surface).toContain("2x melon\n🖼 image/jpeg https://media.test/one.jpeg")
  })

  test("shows the body a message carries", () => {
    expect(formatSmsSurface(sms("hello amy"), HELPER)).toContain("hello amy")
  })

  test("writes the account the seat acts for into the surface", () => {
    expect(formatSmsSurface(sms("hi"), HELPER)).toContain("acting for account acct-1")
  })

  test("writes no account where the route matched none", () => {
    const surface = formatSmsSurface(sms("hi"), { ...HELPER, accountUserId: null })
    expect(surface).not.toContain("acting for account")
  })

  test("names the seat a message went to", () => {
    expect(formatSmsSurface(sms("hi"), HELPER)).toContain("routed to amy")
  })

  test("names the sender", () => {
    expect(formatSmsSurface(sms("hi"), HELPER)).toContain("+18015551234")
  })
})
