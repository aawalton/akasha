import { describe, expect, test } from "bun:test"
import type { SmsExternalIdentity } from "../sms-identity/sms-identity.module.code.ts"
import { handleInboundSms } from "./handle-inbound.module.code.ts"
import {
  genKeypair,
  messagesOnly,
  neverDiscard,
  recordingDeliver,
  recordingDiscards,
  SAMPLE_SENDER,
  SAMPLE_SENDER_DIGITS,
  sampleBody,
  sign,
} from "./handle-inbound.module.test-fixtures.ts"

const NOW_MS = 1_700_000_000_000
const TIMESTAMP = String(NOW_MS / 1000)

const ENROLLED: SmsExternalIdentity = {
  phoneDigits: SAMPLE_SENDER_DIGITS,
  accountUserId: "acct-1",
  smsAllowed: true,
  handlerTarget: "amy",
}

async function signedArgs(
  body: string,
  identities: readonly SmsExternalIdentity[]
): Promise<Parameters<typeof handleInboundSms>[0]> {
  const { privateKey, publicKeyBase64 } = await genKeypair()
  return {
    rawBody: body,
    signatureBase64: await sign(privateKey, TIMESTAMP, body),
    timestamp: TIMESTAMP,
    publicKeyBase64,
    loadIdentities: async () => identities,
    nowMs: NOW_MS,
  }
}

describe("handleInboundSms", () => {
  test("turns away a message whose signature does not hold with 403", async () => {
    const args = await signedArgs(sampleBody(), [ENROLLED])
    const { deliver, calls } = recordingDeliver()
    const outcome = await handleInboundSms(
      { ...args, signatureBase64: null },
      deliver,
      neverDiscard
    )
    expect(outcome).toEqual({
      kind: "rejected",
      status: 403,
      reason: "signature:missing-signature",
    })
    expect(calls.length).toBe(0)
  })

  test("parses no body until the signature holds", async () => {
    const args = await signedArgs("not json at all", [ENROLLED])
    const outcome = await handleInboundSms(
      { ...args, signatureBase64: null },
      recordingDeliver().deliver,
      neverDiscard
    )
    expect(outcome.kind).toBe("rejected")
    if (outcome.kind !== "rejected") return
    expect(outcome.status).toBe(403)
  })

  test("turns away a body that is not json with 400", async () => {
    const args = await signedArgs("not json at all", [ENROLLED])
    const outcome = await handleInboundSms(args, recordingDeliver().deliver, neverDiscard)
    expect(outcome).toEqual({ kind: "rejected", status: 400, reason: "invalid-json" })
  })

  test("turns away a body the shape refuses with 400", async () => {
    const args = await signedArgs(JSON.stringify({ data: { event_type: "x" } }), [ENROLLED])
    const outcome = await handleInboundSms(args, recordingDeliver().deliver, neverDiscard)
    expect(outcome).toEqual({ kind: "rejected", status: 400, reason: "invalid-payload" })
  })

  test("ignores an event that is not a received message", async () => {
    const args = await signedArgs(sampleBody("hi", "message.sent"), [ENROLLED])
    const outcome = await handleInboundSms(args, recordingDeliver().deliver, neverDiscard)
    expect(outcome).toEqual({ kind: "ignored", reason: "non-inbound-event:message.sent" })
  })

  test("ignores a message going the other way", async () => {
    const args = await signedArgs(sampleBody("hi", "message.received", "outbound"), [ENROLLED])
    const outcome = await handleInboundSms(args, recordingDeliver().deliver, neverDiscard)
    expect(outcome).toEqual({ kind: "ignored", reason: "non-inbound-direction:outbound" })
  })

  test("carries an enrolled sender to its seat", async () => {
    const args = await signedArgs(sampleBody("hello amy"), [ENROLLED])
    const { deliver, calls } = recordingDeliver()
    const outcome = await handleInboundSms(args, deliver, neverDiscard)
    expect(outcome.kind).toBe("routed")
    if (outcome.kind !== "routed") return
    expect(outcome.target).toBe("amy")
    expect(messagesOnly(calls).length).toBe(1)
    expect(messagesOnly(calls)[0]?.content).toContain("hello amy")
    expect(messagesOnly(calls)[0]?.content).toContain(SAMPLE_SENDER)
  })

  test("discards a sender matching nobody enrolled", async () => {
    const args = await signedArgs(sampleBody(), [])
    const { deliver, calls } = recordingDeliver()
    const { recordDiscard, discards } = recordingDiscards()
    const outcome = await handleInboundSms(args, deliver, recordDiscard)
    expect(outcome.kind).toBe("discarded")
    expect(calls.length).toBe(0)
    expect(discards.length).toBe(1)
  })

  test("still answers a discard as a discard where nothing recorded it", async () => {
    const args = await signedArgs(sampleBody(), [])
    const { recordDiscard } = recordingDiscards("the table was gone")
    const outcome = await handleInboundSms(args, recordingDeliver().deliver, recordDiscard)
    expect(outcome.kind).toBe("discarded")
    if (outcome.kind !== "discarded") return
    expect(outcome.reason).toContain("the table was gone")
  })

  test("drops an enrolled sender without permission", async () => {
    const args = await signedArgs(sampleBody(), [{ ...ENROLLED, smsAllowed: false }])
    const { deliver, calls } = recordingDeliver()
    const outcome = await handleInboundSms(args, deliver, neverDiscard)
    expect(outcome.kind).toBe("dropped")
    expect(calls.length).toBe(0)
  })

  test("tells Alan about an enrolled sender naming no seat", async () => {
    const args = await signedArgs(sampleBody(), [{ ...ENROLLED, handlerTarget: null }])
    const { deliver, calls } = recordingDeliver()
    const outcome = await handleInboundSms(args, deliver, neverDiscard)
    expect(outcome.kind).toBe("refused")
    if (outcome.kind !== "refused") return
    expect(outcome.target).toBe(null)
    expect(calls.length).toBe(1)
    expect(calls[0]?.target).toBe("alan")
    expect(calls[0]?.kind).toBe("refusal-notice")
  })

  test("tells Alan about a message no seat accepted", async () => {
    const args = await signedArgs(sampleBody(), [ENROLLED])
    const { deliver, calls } = recordingDeliver(["amy"])
    const outcome = await handleInboundSms(args, deliver, neverDiscard)
    expect(outcome.kind).toBe("refused")
    if (outcome.kind !== "refused") return
    expect(outcome.target).toBe("amy")
    expect(calls[1]?.target).toBe("alan")
  })

  test("keeps the message out of the refusal notice", async () => {
    const args = await signedArgs(sampleBody("my bank pin is 4321"), [ENROLLED])
    const { deliver, calls } = recordingDeliver(["amy"])
    await handleInboundSms(args, deliver, neverDiscard)
    expect(calls[1]?.content).not.toContain("4321")
  })

  test("names a refusal notice that itself failed to land", async () => {
    const args = await signedArgs(sampleBody(), [ENROLLED])
    const { deliver } = recordingDeliver(["amy", "alan"])
    const outcome = await handleInboundSms(args, deliver, neverDiscard)
    expect(outcome.kind).toBe("refused")
    if (outcome.kind !== "refused") return
    expect(outcome.reason).toContain("did not land")
  })
})
