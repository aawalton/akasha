import { expect, test } from "bun:test"
import { onCallRolesIn } from "./seat-role-on-call.module.code.ts"

test("a role holding true under the on-call key is on call", () => {
  expect([...onCallRolesIn([{ value: { slug: "handler", onCall: true } }])]).toEqual(["handler"])
})

test("anything other than true under that key reads as not on call", () => {
  const held = onCallRolesIn([
    { value: { slug: "worker", onCall: false } },
    { value: { slug: "definer" } },
    { value: { slug: "coach", onCall: "true" } },
    { value: { slug: "operator", onCall: 1 } },
  ])

  expect([...held]).toEqual([])
})

test("a role naming no slug is left out", () => {
  const held = onCallRolesIn([
    { value: { onCall: true } },
    { value: { slug: "", onCall: true } },
    { value: { slug: 7, onCall: true } },
  ])

  expect([...held]).toEqual([])
})

test("a value that is no record is passed over rather than refused", () => {
  const held = onCallRolesIn([
    { value: null },
    { value: "handler" },
    { value: [{ slug: "handler", onCall: true }] },
    { value: { slug: "handler", onCall: true } },
  ])

  expect([...held]).toEqual(["handler"])
})
