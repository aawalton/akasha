import { describe, expect, test } from "bun:test"
import {
  genKeypair,
  messagesOnly,
  neverDiscard,
  recordingDeliver,
  recordingDiscards,
  sampleBody,
  sign,
} from "./_inbound-test-support"
import { handleInboundSms } from "./handle-inbound"

const ALAN_HANDLER_SEAT = "amy-alan-handler"

function countingLoader<
  T extends { phoneDigits: string; accountUserId: string; smsAllowed: boolean },
>(
  identities: readonly T[]
): { loadIdentities: () => Promise<readonly T[]>; loadCount: () => number } {
  let count = 0
  return {
    loadCount: () => count,
    loadIdentities: async () => {
      count += 1
      return identities
    },
  }
}

describe("handleInboundSms", () => {
  test("a signed inbound from a sender nobody has enrolled is discarded — no delivery, no wake, no reply", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("dinner at 7?")
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()
    const { recordDiscard, discards } = recordingDiscards()

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [],
        nowMs,
      },
      deliver,
      recordDiscard
    )

    expect(outcome.kind).toBe("discarded")
    expect(calls).toHaveLength(0)
    expect(discards).toHaveLength(1)
    expect(discards[0]?.sender).toBe("+18015551234")
    expect(JSON.stringify(discards)).not.toContain("dinner at 7?")
  })

  test("content naming a helper does not deliver the sender either — still discarded", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("what's on my calendar")
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()
    const { recordDiscard, discards } = recordingDiscards()

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [],
        nowMs,
      },
      deliver,
      recordDiscard
    )

    expect(outcome.kind).toBe("discarded")
    expect(calls).toHaveLength(0)
    expect(discards).toHaveLength(1)
  })

  test("an unrecorded discard is still a discard — the failure is reported, not delivered", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("hello?")
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()
    const { recordDiscard } = recordingDiscards("page type sms-discard not found")

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [],
        nowMs,
      },
      deliver,
      recordDiscard
    )

    expect(outcome.kind).toBe("discarded")
    if (outcome.kind === "discarded") {
      expect(outcome.reason).toContain("page type sms-discard not found")
    }
    expect(calls).toHaveLength(0)
  })

  test("a discarded stranger never reaches Alan's own handler seat", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("let me in")
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()
    const { recordDiscard } = recordingDiscards()

    await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [],
        nowMs,
      },
      deliver,
      recordDiscard
    )

    expect(calls.map((c) => c.target)).not.toContain(ALAN_HANDLER_SEAT)
    expect(calls.map((c) => c.target)).not.toContain("amy")
  })

  test("rejects a tampered signature (403) and never delivers", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody()
    const goodSig = await sign(privateKey, timestamp, rawBody)
    const tamperedSig = await sign(privateKey, timestamp, sampleBody("different"))
    expect(tamperedSig).not.toBe(goodSig)
    const { deliver, calls } = recordingDeliver()

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64: tamperedSig,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [],
        nowMs,
      },
      deliver,
      neverDiscard
    )

    expect(outcome.kind).toBe("rejected")
    if (outcome.kind === "rejected") expect(outcome.status).toBe(403)
    expect(calls).toHaveLength(0)
  })

  test("rejects a stale timestamp outside the replay window (403)", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const staleTs = String(Math.floor(nowMs / 1000) - 3600)
    const rawBody = sampleBody()
    const signatureBase64 = await sign(privateKey, staleTs, rawBody)
    const { deliver, calls } = recordingDeliver()

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp: staleTs,
        publicKeyBase64,
        loadIdentities: async () => [],
        nowMs,
      },
      deliver,
      neverDiscard
    )

    expect(outcome.kind).toBe("rejected")
    if (outcome.kind === "rejected") expect(outcome.reason).toContain("stale")
    expect(calls).toHaveLength(0)
  })

  test("rejects an invalid-JSON body after a valid signature (400)", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = "this is not json"
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [],
        nowMs,
      },
      deliver,
      neverDiscard
    )

    expect(outcome.kind).toBe("rejected")
    if (outcome.kind === "rejected") {
      expect(outcome.status).toBe(400)
      expect(outcome.reason).toBe("invalid-json")
    }
    expect(calls).toHaveLength(0)
  })

  test("ignores a non message.received event without delivering", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("delivered", "message.finalized", "outbound")
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [],
        nowMs,
      },
      deliver,
      neverDiscard
    )

    expect(outcome.kind).toBe("ignored")
    expect(calls).toHaveLength(0)
  })

  test("routes an allowlisted SMS identity to ki-handler, surfacing its accountUserId", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("just finished a great novel")
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [
          {
            phoneDigits: "8015551234",
            accountUserId: "acct-ki",
            smsAllowed: true,
            handlerTarget: "ki-handler",
          },
        ],
        nowMs,
      },
      deliver,
      neverDiscard
    )

    expect(outcome.kind).toBe("routed")
    if (outcome.kind === "routed") expect(outcome.target).toBe("ki-handler")
    expect(calls).toHaveLength(1)
    expect(calls[0]?.target).toBe("ki-handler")
    expect(calls[0]?.content).toContain("acct-ki")
  })

  test("drops a matched-but-revoked external identity fail-closed (never delivers)", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("a private opinion")
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities: async () => [
          {
            phoneDigits: "8015551234",
            accountUserId: "acct-ki",
            smsAllowed: false,
            handlerTarget: "ki-handler",
          },
        ],
        nowMs,
      },
      deliver,
      neverDiscard
    )

    expect(outcome.kind).toBe("dropped")
    expect(calls).toHaveLength(0)
  })

  test("an unverified inbound never loads the allowlist (zero service-role read) and 403s", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("a private opinion")
    const tamperedSig = await sign(privateKey, timestamp, sampleBody("different"))
    const { deliver, calls } = recordingDeliver()
    const { loadIdentities, loadCount } = countingLoader([
      {
        phoneDigits: "8015551234",
        accountUserId: "acct-ki",
        smsAllowed: true,
        handlerTarget: "ki-handler",
      },
    ])

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64: tamperedSig,
        timestamp,
        publicKeyBase64,
        loadIdentities,
        nowMs,
      },
      deliver,
      neverDiscard
    )

    expect(outcome.kind).toBe("rejected")
    if (outcome.kind === "rejected") expect(outcome.status).toBe(403)
    expect(loadCount()).toBe(0)
    expect(calls).toHaveLength(0)
  })

  test("a verified inbound loads the allowlist exactly once and routes normally", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const nowMs = 1_750_000_000_000
    const timestamp = String(Math.floor(nowMs / 1000))
    const rawBody = sampleBody("just finished a great novel")
    const signatureBase64 = await sign(privateKey, timestamp, rawBody)
    const { deliver, calls } = recordingDeliver()
    const { loadIdentities, loadCount } = countingLoader([
      {
        phoneDigits: "8015551234",
        accountUserId: "acct-ki",
        smsAllowed: true,
        handlerTarget: "ki-handler",
      },
    ])

    const outcome = await handleInboundSms(
      {
        rawBody,
        signatureBase64,
        timestamp,
        publicKeyBase64,
        loadIdentities,
        nowMs,
      },
      deliver,
      neverDiscard
    )

    expect(outcome.kind).toBe("routed")
    if (outcome.kind === "routed") expect(outcome.target).toBe("ki-handler")
    expect(loadCount()).toBe(1)
    expect(messagesOnly(calls)).toHaveLength(1)
  })
})
