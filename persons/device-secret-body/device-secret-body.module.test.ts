import { expect, test } from "bun:test"
import {
  mintDeviceSecretResponseSchema,
  mintDeviceSecretSchema,
  revokeDeviceSecretSchema,
} from "./device-secret-body.module.code.ts"

test("a mint body naming a device is taken", () => {
  expect(mintDeviceSecretSchema.safeParse({ deviceId: "a-device" }).success).toBe(true)
})

test("a mint body naming no device is refused", () => {
  expect(mintDeviceSecretSchema.safeParse({ deviceId: "" }).success).toBe(false)
  expect(mintDeviceSecretSchema.safeParse({}).success).toBe(false)
})

test("a mint body carrying more than the device it names is refused", () => {
  expect(mintDeviceSecretSchema.safeParse({ deviceId: "a-device", userId: "me" }).success).toBe(
    false
  )
})

test("a revoke body is read by the same rule as a mint body", () => {
  expect(revokeDeviceSecretSchema.safeParse({ deviceId: "a-device" }).success).toBe(true)
  expect(revokeDeviceSecretSchema.safeParse({ deviceId: "" }).success).toBe(false)
})

test("an answer carrying a secret of the minted shape is taken", () => {
  const answered = mintDeviceSecretResponseSchema.safeParse({
    ok: true,
    deviceSecret: `dvs_v1_${"a".repeat(43)}`,
  })
  expect(answered.success).toBe(true)
})

test("an answer carrying a secret of another shape is refused", () => {
  expect(
    mintDeviceSecretResponseSchema.safeParse({ ok: true, deviceSecret: "not-a-secret" }).success
  ).toBe(false)
})

test("an answer that does not say it is ok is refused", () => {
  expect(
    mintDeviceSecretResponseSchema.safeParse({
      ok: false,
      deviceSecret: `dvs_v1_${"a".repeat(43)}`,
    }).success
  ).toBe(false)
})
