import { expect, test } from "bun:test"
import { roleIsOnCall } from "akasha/agent/seat/declaration/modules/seat-role-on-call/seat-role-on-call.module.code.ts"

test("a role whose page holds true under the on-call key is on call", () => {
  expect(roleIsOnCall("handler")).toBe(true)
})

test("a role whose page holds false under that key is not on call", () => {
  expect(roleIsOnCall("definer")).toBe(false)
})

test("a slug naming no role is not on call", () => {
  expect(roleIsOnCall("no-role-carries-this-slug")).toBe(false)
})

test("no slug at all is not on call", () => {
  expect(roleIsOnCall(null)).toBe(false)
  expect(roleIsOnCall("")).toBe(false)
})
