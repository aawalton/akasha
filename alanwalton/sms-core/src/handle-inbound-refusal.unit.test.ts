import { describe, expect, test } from "bun:test"
import {
  type DeliveryCall,
  genKeypair,
  messagesOnly,
  neverDiscard,
  recordingDeliver,
  SAMPLE_SENDER,
  SAMPLE_SENDER_DIGITS,
  sampleBody,
  sign,
} from "./_inbound-test-support"
import { handleInboundSms } from "./handle-inbound"

const ALAN_HANDLER_SEAT = "alan"

describe("handleInboundSms — refusing an inbound with nowhere of its own to go", () => {
  async function inboundFromEnrolledSenderWithNoHandler(args: {
    text: string
    seatless?: readonly string[]
    handlerTarget?: string | null
  }): Promise<{
    outcome: Awaited<ReturnType<typeof handleInboundSms>>
    calls: readonly DeliveryCall[]
  }> {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody(args.text)
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver(args.seatless ?? [])

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [
          {
            phoneDigits: SAMPLE_SENDER_DIGITS,
            accountUserId: "acct-enrolled",
            smsAllowed: true,
            handlerTarget: args.handlerTarget ?? null,
          },
        ],
        nowMs,
      },
      deliver,
      neverDiscard
    )
    return { outcome, calls }
  }

  test("an enrolled sender whose record names no handler is refused, and no handler is delivered to", async () => {
    const { outcome, calls } = await inboundFromEnrolledSenderWithNoHandler({
      text: "something only I should decide who reads",
    })

    expect(outcome.kind).toBe("refused")
    if (outcome.kind === "refused") expect(outcome.target).toBeNull()
    expect(messagesOnly(calls)).toHaveLength(0)
  })

  test("a destination naming no agent row is refused with its reason, never thrown", async () => {
    const { outcome, calls } = await inboundFromEnrolledSenderWithNoHandler({
      text: "log this book",
      handlerTarget: "handler-with-no-row",
      seatless: ["handler-with-no-row"],
    })

    expect(outcome.kind).toBe("refused")
    if (outcome.kind === "refused") {
      expect(outcome.target).toBe("handler-with-no-row")
      expect(outcome.reason).toContain("handler-with-no-row")
    }
    expect(messagesOnly(calls).map((c) => c.target)).toEqual(["handler-with-no-row"])
  })

  test("the refusal reaches Alan's handler, names who and why, and carries none of the sender's words", async () => {
    const body = "the private thing I told nobody else"
    const { outcome, calls } = await inboundFromEnrolledSenderWithNoHandler({ text: body })

    expect(outcome.kind).toBe("refused")
    const notices = calls.filter((c) => c.kind === "refusal-notice")
    expect(notices).toHaveLength(1)
    const notice = notices[0]
    expect(notice?.target).toBe(ALAN_HANDLER_SEAT)
    expect(notice?.content).toContain(SAMPLE_SENDER)
    expect(notice?.content).toContain("acct-enrolled")
    expect(notice?.content).toContain("no handler")
    expect(notice?.content).not.toContain(body)
    expect(notice?.content).not.toContain("private thing")
  })

  test("a refusal whose notice cannot be delivered is still a refusal, not an error", async () => {
    const { outcome } = await inboundFromEnrolledSenderWithNoHandler({
      text: "hello",
      seatless: [ALAN_HANDLER_SEAT],
    })

    expect(outcome.kind).toBe("refused")
    if (outcome.kind === "refused") expect(outcome.reason).toContain(ALAN_HANDLER_SEAT)
  })
})
