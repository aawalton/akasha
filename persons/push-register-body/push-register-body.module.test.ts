import { expect, test } from "bun:test"
import { registerDeviceTokenSchema } from "./push-register-body.module.code.ts"

test("a body naming a token and iOS is taken", () => {
  expect(
    registerDeviceTokenSchema.safeParse({ deviceToken: "a-token", platform: "ios" }).success
  ).toBe(true)
})

test("a body carrying no token is refused", () => {
  expect(registerDeviceTokenSchema.safeParse({ deviceToken: "", platform: "ios" }).success).toBe(
    false
  )
  expect(registerDeviceTokenSchema.safeParse({ platform: "ios" }).success).toBe(false)
})

test("a platform other than iOS is refused", () => {
  expect(
    registerDeviceTokenSchema.safeParse({ deviceToken: "a-token", platform: "android" }).success
  ).toBe(false)
})

test("a body carrying more than the token and the platform is refused", () => {
  expect(
    registerDeviceTokenSchema.safeParse({ deviceToken: "a-token", platform: "ios", userId: "me" })
      .success
  ).toBe(false)
})
