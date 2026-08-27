import { describe, expect, test } from "bun:test"
import { verifyTelnyxSignature } from "./verify-signature"

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ""
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary)
}

function toKeyPair(key: CryptoKey | CryptoKeyPair): CryptoKeyPair {
  if ("privateKey" in key) return key
  throw new Error("expected a CryptoKeyPair")
}

async function genKeypair(): Promise<{ privateKey: CryptoKey; publicKeyBase64: string }> {
  const kp = toKeyPair(
    await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"])
  )
  const rawPublic = new Uint8Array(await crypto.subtle.exportKey("raw", kp.publicKey))
  return { privateKey: kp.privateKey, publicKeyBase64: bytesToBase64(rawPublic) }
}

async function sign(privateKey: CryptoKey, timestamp: string, rawBody: string): Promise<string> {
  const message = new TextEncoder().encode(`${timestamp}|${rawBody}`)
  const sig = new Uint8Array(await crypto.subtle.sign({ name: "Ed25519" }, privateKey, message))
  return bytesToBase64(sig)
}

const NOW_MS = 1_750_000_000_000
const TS = String(Math.floor(NOW_MS / 1000))
const BODY = '{"hello":"world"}'

describe("verifyTelnyxSignature", () => {
  test("accepts a correctly signed payload", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const signatureBase64 = await sign(privateKey, TS, BODY)
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64,
      timestamp: TS,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result.ok).toBe(true)
  })

  test("rejects a signature over a different body", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const signatureBase64 = await sign(privateKey, TS, BODY)
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64,
      timestamp: TS,
      rawBody: '{"hello":"tampered"}',
      nowMs: NOW_MS,
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe("signature-mismatch")
  })

  test("rejects a signature from a different key", async () => {
    const signer = await genKeypair()
    const other = await genKeypair()
    const signatureBase64 = await sign(signer.privateKey, TS, BODY)
    const result = await verifyTelnyxSignature({
      publicKeyBase64: other.publicKeyBase64,
      signatureBase64,
      timestamp: TS,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result.ok).toBe(false)
  })

  test("rejects a missing signature", async () => {
    const { publicKeyBase64 } = await genKeypair()
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64: null,
      timestamp: TS,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe("missing-signature")
  })

  test("rejects a stale timestamp", async () => {
    const { privateKey, publicKeyBase64 } = await genKeypair()
    const staleTs = String(Math.floor(NOW_MS / 1000) - 1000)
    const signatureBase64 = await sign(privateKey, staleTs, BODY)
    const result = await verifyTelnyxSignature({
      publicKeyBase64,
      signatureBase64,
      timestamp: staleTs,
      rawBody: BODY,
      nowMs: NOW_MS,
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.reason).toBe("stale-timestamp")
  })
})
