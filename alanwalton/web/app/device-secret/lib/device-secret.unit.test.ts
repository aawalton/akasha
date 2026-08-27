import { describe, expect, test } from "bun:test"
import {
  DEVICE_SECRET_PREFIX,
  hasDeviceSecretShape,
  MintDeviceSecretResponseSchema,
  MintDeviceSecretSchema,
  RevokeDeviceSecretSchema,
  readPresentedDeviceSecret,
} from "./device-secret"

const BODY = "abcdefghijklmnopqrstuvwxyz0123456789_-ABCDE"
const VALID = `${DEVICE_SECRET_PREFIX}${BODY}`

describe("hasDeviceSecretShape — the cheap pre-DB rejection", () => {
  test("accepts a well-formed secret", () => {
    expect(hasDeviceSecretShape(VALID)).toBe(true)
  })

  test("rejects a value without the dvs_v1_ prefix", () => {
    expect(hasDeviceSecretShape(BODY)).toBe(false)
    expect(hasDeviceSecretShape(`dvs_v2_${BODY}`)).toBe(false)
    expect(hasDeviceSecretShape(`Bearer ${BODY}`)).toBe(false)
  })

  test("rejects a session JWT — credential confusion never reaches the database", () => {
    expect(hasDeviceSecretShape("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.sig")).toBe(
      false
    )
  })

  test("rejects a wrong-length body", () => {
    expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${BODY.slice(0, 42)}`)).toBe(false)
    expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${BODY}X`)).toBe(false)
  })

  test("rejects a body carrying non-base64url characters", () => {
    expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${BODY.slice(0, 42)}=`)).toBe(false)
    expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${BODY.slice(0, 42)}/`)).toBe(false)
  })
})

describe("readPresentedDeviceSecret", () => {
  test("reports an absent header", () => {
    expect(readPresentedDeviceSecret(null)).toEqual({ ok: false, reason: "absent" })
    expect(readPresentedDeviceSecret("")).toEqual({ ok: false, reason: "absent" })
  })

  test("reports a malformed header", () => {
    expect(readPresentedDeviceSecret("nonsense")).toEqual({ ok: false, reason: "malformed" })
  })

  test("passes a well-formed secret through unchanged", () => {
    expect(readPresentedDeviceSecret(VALID)).toEqual({ ok: true, secret: VALID })
  })
})

describe("MintDeviceSecretSchema / RevokeDeviceSecretSchema", () => {
  test("accept a well-formed body", () => {
    expect(MintDeviceSecretSchema.safeParse({ deviceId: "ABC-123" }).success).toBe(true)
    expect(RevokeDeviceSecretSchema.safeParse({ deviceId: "ABC-123" }).success).toBe(true)
  })

  test("reject a missing or empty deviceId", () => {
    expect(MintDeviceSecretSchema.safeParse({}).success).toBe(false)
    expect(MintDeviceSecretSchema.safeParse({ deviceId: "" }).success).toBe(false)
  })

  test("reject a smuggled userId (strict) — identity never comes from the body", () => {
    expect(
      MintDeviceSecretSchema.safeParse({ deviceId: "ABC-123", userId: "smuggled" }).success
    ).toBe(false)
    expect(
      RevokeDeviceSecretSchema.safeParse({ deviceId: "ABC-123", userId: "smuggled" }).success
    ).toBe(false)
  })

  test("reject a caller-supplied secret — the server is the only minter", () => {
    expect(
      MintDeviceSecretSchema.safeParse({ deviceId: "ABC-123", deviceSecret: VALID }).success
    ).toBe(false)
  })
})

describe("MintDeviceSecretResponseSchema — the one moment plaintext enters JS", () => {
  test("accepts the live route's observed success body", () => {
    const parsed = MintDeviceSecretResponseSchema.safeParse({ ok: true, deviceSecret: VALID })
    expect(parsed.success).toBe(true)
    expect(parsed.success && parsed.data.deviceSecret).toBe(VALID)
  })

  test("refuses a malformed secret BEFORE it can reach the Keychain", () => {
    expect(
      MintDeviceSecretResponseSchema.safeParse({ ok: true, deviceSecret: "not-a-secret" }).success
    ).toBe(false)
    expect(MintDeviceSecretResponseSchema.safeParse({ ok: true, deviceSecret: "" }).success).toBe(
      false
    )
    expect(MintDeviceSecretResponseSchema.safeParse({ ok: true }).success).toBe(false)
  })

  test("refuses a body that is not an affirmative success", () => {
    expect(
      MintDeviceSecretResponseSchema.safeParse({ ok: false, deviceSecret: VALID }).success
    ).toBe(false)
  })

  test("TOLERATES an unknown server field — the shell's JS ships in the app binary", () => {
    const parsed = MintDeviceSecretResponseSchema.safeParse({
      ok: true,
      deviceSecret: VALID,
      expiresAt: "2030-01-01T00:00:00Z",
    })
    expect(parsed.success).toBe(true)
    expect(parsed.success && parsed.data.deviceSecret).toBe(VALID)
  })
})
