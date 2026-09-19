import { describe, expect, test } from "bun:test"
import { verifyStripeSignature } from "akasha/product/kofi/stripe/modules/verify-stripe-signature/verify-stripe-signature.module.code.ts"

const SECRET = "whsec_test_secret"
const BODY = '{"id":"evt_1"}'
const TIMESTAMP = "1700000000"
const NOW_MS = 1_700_000_000_000
const SIGNATURE = "248a374f50f943a28b0f6ab50faf9a7e7e29b710fa26df9fb1618b9bf8ea9c9a"
const HEADER = `t=${TIMESTAMP},v1=${SIGNATURE}`

describe("verifyStripeSignature", () => {
  test("takes the signature Stripe publishes for a known body", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: HEADER,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: true })
  })

  test("takes a header carrying a second signature beside the one that verifies", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: `t=${TIMESTAMP},v1=${"0".repeat(64)},v1=${SIGNATURE}`,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: true })
  })

  test("passes over a scheme it does not know", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: `t=${TIMESTAMP},v0=${"0".repeat(64)},v1=${SIGNATURE}`,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: true })
  })

  test("refuses a body changed by one space", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: HEADER,
      rawBody: `${BODY} `,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "signature-mismatch" })
  })

  test("refuses a signature made under another secret", async () => {
    const result = await verifyStripeSignature({
      signingSecret: "whsec_another_secret",
      signatureHeader: HEADER,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "signature-mismatch" })
  })

  test("refuses a request carrying no header", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: null,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "missing-signature" })
  })

  test("refuses a header carrying no signature", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: `t=${TIMESTAMP}`,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "missing-signature" })
  })

  test("refuses a header carrying no timestamp", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: `v1=${SIGNATURE}`,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "missing-timestamp" })
  })

  test("refuses a timestamp that is no number", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: `t=yesterday,v1=${SIGNATURE}`,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "invalid-timestamp" })
  })

  test("refuses a signature older than the tolerance however well it verifies", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: HEADER,
      rawBody: BODY,
      nowMs: NOW_MS + 301_000,
    })
    expect(result).toEqual({ ok: false, reason: "stale-timestamp" })
  })

  test("takes a signature just inside the tolerance", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: HEADER,
      rawBody: BODY,
      nowMs: NOW_MS + 299_000,
    })
    expect(result).toEqual({ ok: true })
  })

  test("tolerates a clock ahead of Stripe as far as one behind it", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: HEADER,
      rawBody: BODY,
      nowMs: NOW_MS - 301_000,
    })
    expect(result).toEqual({ ok: false, reason: "stale-timestamp" })
  })

  test("honours a tolerance the caller widens", async () => {
    const result = await verifyStripeSignature({
      signingSecret: SECRET,
      signatureHeader: HEADER,
      rawBody: BODY,
      nowMs: NOW_MS + 301_000,
      toleranceSeconds: 600,
    })
    expect(result).toEqual({ ok: true })
  })

  test("refuses where no secret is held rather than verifying nothing", async () => {
    const result = await verifyStripeSignature({
      signingSecret: "",
      signatureHeader: HEADER,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "missing-secret" })
  })
})
