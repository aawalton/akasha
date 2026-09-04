import { expect, test } from "bun:test"
import {
  DEVICE_SECRET_BODY_LENGTH,
  DEVICE_SECRET_PREFIX,
  hasDeviceSecretShape,
} from "./device-secret-shape.module.code.ts"

const BODY = "a".repeat(DEVICE_SECRET_BODY_LENGTH)

test("a secret written with the prefix and 43 base64url characters has the shape", () => {
  expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${BODY}`)).toBe(true)
  expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${"-_9Z".repeat(10)}abc`)).toBe(true)
})

test("a secret written too short or too long has no shape", () => {
  expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${"a".repeat(42)}`)).toBe(false)
  expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${"a".repeat(44)}`)).toBe(false)
  expect(hasDeviceSecretShape("dvs_v1_short")).toBe(false)
  expect(hasDeviceSecretShape("")).toBe(false)
})

test("a secret written without the prefix has no shape", () => {
  expect(hasDeviceSecretShape(BODY)).toBe(false)
  expect(hasDeviceSecretShape(`dvs_v2_${BODY}`)).toBe(false)
})

test("a secret carrying a character outside base64url has no shape", () => {
  expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${"a".repeat(42)}+`)).toBe(false)
  expect(hasDeviceSecretShape(`${DEVICE_SECRET_PREFIX}${"a".repeat(42)}=`)).toBe(false)
})

test("the same value is read the same way twice", () => {
  const said = `${DEVICE_SECRET_PREFIX}${BODY}`
  expect(hasDeviceSecretShape(said)).toBe(true)
  expect(hasDeviceSecretShape(said)).toBe(true)
})
