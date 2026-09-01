import { expect, test } from "bun:test"
import { decidePermissionAction } from "./push-permission.module.code.ts"

test("a device that granted the permission registers", () => {
  expect(decidePermissionAction("granted")).toBe("register")
})

test("a device that has not been asked is asked", () => {
  expect(decidePermissionAction("prompt")).toBe("request")
  expect(decidePermissionAction("prompt-with-rationale")).toBe("request")
})

test("a device that refused is left without push", () => {
  expect(decidePermissionAction("denied")).toBe("degrade")
})
