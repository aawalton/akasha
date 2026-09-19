import { expect, test } from "bun:test"
import { registerDeviceTokenSchema } from "akasha/person/modules/push-register-body/push-register-body.module.code.ts"

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

test("a body carrying more than the token, the platform and the sort is refused", () => {
  expect(
    registerDeviceTokenSchema.safeParse({ deviceToken: "a-token", platform: "ios", userId: "me" })
      .success
  ).toBe(false)
})

test("a body naming a live activity is taken", () => {
  expect(
    registerDeviceTokenSchema.safeParse({
      deviceToken: "a-token",
      platform: "ios",
      pushType: "liveactivity",
    }).success
  ).toBe(true)
})

test("a sort that is no sort of push is refused", () => {
  expect(
    registerDeviceTokenSchema.safeParse({
      deviceToken: "a-token",
      platform: "ios",
      pushType: "complication",
    }).success
  ).toBe(false)
})
