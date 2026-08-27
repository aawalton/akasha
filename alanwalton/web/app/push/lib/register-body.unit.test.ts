import { describe, expect, test } from "bun:test"
import { RegisterDeviceTokenSchema } from "./register-body"

describe("RegisterDeviceTokenSchema", () => {
  test("accepts a well-formed iOS registration", () => {
    const parsed = RegisterDeviceTokenSchema.safeParse({ deviceToken: "abc123", platform: "ios" })
    expect(parsed.success).toBe(true)
  })

  test("rejects an empty device token", () => {
    expect(RegisterDeviceTokenSchema.safeParse({ deviceToken: "", platform: "ios" }).success).toBe(
      false
    )
  })

  test("rejects a missing device token", () => {
    expect(RegisterDeviceTokenSchema.safeParse({ platform: "ios" }).success).toBe(false)
  })

  test("rejects an unknown platform", () => {
    expect(
      RegisterDeviceTokenSchema.safeParse({ deviceToken: "abc123", platform: "android" }).success
    ).toBe(false)
  })

  test("rejects an unexpected extra key (strict)", () => {
    expect(
      RegisterDeviceTokenSchema.safeParse({
        deviceToken: "abc123",
        platform: "ios",
        userId: "smuggled",
      }).success
    ).toBe(false)
  })
})
