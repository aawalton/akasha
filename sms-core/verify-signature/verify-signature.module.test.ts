import { describe, expect, test } from "bun:test"
import { verifyTelnyxSignature } from "./verify-signature.module.code.ts"
import { bytesToBase64 } from "./verify-signature.module.test-fixtures.ts"

async function keypair(): Promise<{ privateKey: CryptoKey; publicKeyBase64: string }> {
  const generated = await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"])
  if (!("privateKey" in generated)) throw new Error("expected a CryptoKeyPair")
  const rawPublic = new Uint8Array(await crypto.subtle.exportKey("raw", generated.publicKey))
  return { privateKey: generated.privateKey, publicKeyBase64: bytesToBase64(rawPublic) }
}

async function sign(privateKey: CryptoKey, timestamp: string, rawBody: string): Promise<string> {
  const message = new TextEncoder().encode(`${timestamp}|${rawBody}`)
  const signed = await crypto.subtle.sign({ name: "Ed25519" }, privateKey, message)
  return bytesToBase64(new Uint8Array(signed))
}

const BODY = '{"data":{"event_type":"message.received"}}'
const NOW_MS = 1_700_000_000_000
const TIMESTAMP = String(NOW_MS / 1000)

describe("verifyTelnyxSignature", () => {
  test("accepts a signature over the timestamp and the body", async () => {
    const { privateKey, publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: await sign(privateKey, TIMESTAMP, BODY),
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: true })
  })

  test("refuses a signature over a different body", async () => {
    const { privateKey, publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: await sign(privateKey, TIMESTAMP, BODY),
      timestamp: TIMESTAMP,
      rawBody: `${BODY} `,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "signature-mismatch" })
  })

  test("refuses a signature made by another key", async () => {
    const signer = await keypair()
    const other = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64: other.publicKeyBase64,
      signatureBase64: await sign(signer.privateKey, TIMESTAMP, BODY),
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result.ok).toBe(false)
  })

  test("refuses a message carrying no signature", async () => {
    const { publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: null,
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "missing-signature" })
  })

  test("refuses a message carrying no timestamp", async () => {
    const { privateKey, publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: await sign(privateKey, TIMESTAMP, BODY),
      timestamp: "",
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "missing-timestamp" })
  })

  test("refuses a timestamp that is not a number", async () => {
    const { privateKey, publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: await sign(privateKey, "yesterday", BODY),
      timestamp: "yesterday",
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "invalid-timestamp" })
  })

  test("refuses a signature older than the tolerance however well it verifies", async () => {
    const { privateKey, publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: await sign(privateKey, TIMESTAMP, BODY),
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS + 301_000,
    })
    expect(result).toEqual({ ok: false, reason: "stale-timestamp" })
  })

  test("takes a signature just inside the tolerance", async () => {
    const { privateKey, publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: await sign(privateKey, TIMESTAMP, BODY),
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS + 299_000,
    })
    expect(result).toEqual({ ok: true })
  })

  test("tolerates a clock ahead of the signer as far as one behind it", async () => {
    const { privateKey, publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: await sign(privateKey, TIMESTAMP, BODY),
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS - 301_000,
    })
    expect(result).toEqual({ ok: false, reason: "stale-timestamp" })
  })

  test("honours a tolerance the caller widens", async () => {
    const { privateKey, publicKeyBase64 } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: await sign(privateKey, TIMESTAMP, BODY),
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS + 301_000,
      toleranceSeconds: 600,
    })
    expect(result).toEqual({ ok: true })
  })

  test("reports text that is not base64 rather than throwing", async () => {
    const result = await verifyTelnyxSignature({
      publicKeyBase64: "!!!not base64!!!",
      signatureBase64: "!!!not base64!!!",
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "invalid-base64" })
  })

  test("reports a key it cannot import rather than throwing", async () => {
    const { privateKey } = await keypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64: bytesToBase64(new Uint8Array([1, 2, 3])),
      signatureBase64: await sign(privateKey, TIMESTAMP, BODY),
      timestamp: TIMESTAMP,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result).toEqual({ ok: false, reason: "verify-error" })
  })
})
