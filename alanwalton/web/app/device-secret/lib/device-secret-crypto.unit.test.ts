import { describe, expect, test } from "bun:test"
import { DEVICE_SECRET_PREFIX } from "./device-secret"
import {
  deviceSecretHashesEqual,
  generateDeviceSecret,
  hashDeviceSecret,
  verifyDeviceSecret,
} from "./device-secret-crypto.server"

const HASH_RE = /^[0-9a-f]{64}$/

describe("generateDeviceSecret", () => {
  test("mints `dvs_v1_` + 43 unpadded base64url chars", () => {
    const secret = generateDeviceSecret()
    expect(secret.startsWith(DEVICE_SECRET_PREFIX)).toBe(true)
    const body = secret.slice(DEVICE_SECRET_PREFIX.length)
    expect(body).toHaveLength(43)
    expect(body).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(body).not.toContain("=")
    expect(body).not.toContain("+")
    expect(body).not.toContain("/")
  })

  test("never repeats — each mint is fresh CSPRNG output", () => {
    const minted = new Set(Array.from({ length: 64 }, () => generateDeviceSecret()))
    expect(minted.size).toBe(64)
  })
})

describe("hashDeviceSecret", () => {
  test("is SHA-256 hex", () => {
    expect(hashDeviceSecret(generateDeviceSecret())).toMatch(HASH_RE)
  })

  test("covers the ENTIRE string including the version prefix", () => {
    const body = "abcdefghijklmnopqrstuvwxyz0123456789_-ABCDE"
    expect(hashDeviceSecret(`${DEVICE_SECRET_PREFIX}${body}`)).not.toBe(hashDeviceSecret(body))
  })

  test("is deterministic for the same input and distinct for different inputs", () => {
    const a = generateDeviceSecret()
    const b = generateDeviceSecret()
    expect(hashDeviceSecret(a)).toBe(hashDeviceSecret(a))
    expect(hashDeviceSecret(a)).not.toBe(hashDeviceSecret(b))
  })
})

describe("deviceSecretHashesEqual — constant-time compare", () => {
  test("true for identical digests", () => {
    const hash = hashDeviceSecret(generateDeviceSecret())
    expect(deviceSecretHashesEqual(hash, hash)).toBe(true)
  })

  test("false for different digests", () => {
    expect(
      deviceSecretHashesEqual(
        hashDeviceSecret(generateDeviceSecret()),
        hashDeviceSecret(generateDeviceSecret())
      )
    ).toBe(false)
  })

  test("answers false on a length mismatch rather than throwing", () => {
    expect(deviceSecretHashesEqual("abc", hashDeviceSecret("x"))).toBe(false)
    expect(deviceSecretHashesEqual("", "")).toBe(true)
  })
})

describe("verifyDeviceSecret", () => {
  const secret = generateDeviceSecret()
  const presentedHash = hashDeviceSecret(secret)
  const standing = { userId: "user-1", secretHash: presentedHash, revokedAt: null }

  test("rejects an unknown secret (no row matched)", () => {
    const result = verifyDeviceSecret({ standing: null, presentedHash })
    expect(result).toEqual({ ok: false, reason: "unknown" })
  })

  test("rejects a revoked row even when the hash matches", () => {
    const result = verifyDeviceSecret({
      standing: { ...standing, revokedAt: "2026-07-24T00:00:00.000Z" },
      presentedHash,
    })
    expect(result).toEqual({ ok: false, reason: "revoked" })
  })

  test("rejects a hash mismatch", () => {
    const result = verifyDeviceSecret({
      standing: { ...standing, secretHash: hashDeviceSecret(generateDeviceSecret()) },
      presentedHash,
    })
    expect(result).toEqual({ ok: false, reason: "mismatch" })
  })

  test("resolves the owner FROM THE PAGE — never from any caller-supplied value", () => {
    const result = verifyDeviceSecret({ standing, presentedHash })
    expect(result).toEqual({ ok: true, userId: "user-1" })
  })
})
