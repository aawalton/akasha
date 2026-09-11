import { expect, test } from "bun:test"
import {
  noteOf,
  notesOf,
  type Refreshing,
} from "akasha/agents/claude-accounts/modules/refreshing/claude-account-refreshing.module.code.ts"

function refreshing(one: Partial<Refreshing>): Refreshing {
  return { account: "one", kind: "read", why: null, ...one }
}

test("an account that was read carries no note", () => {
  expect(noteOf(refreshing({ kind: "read" }))).toBeNull()
})

test("an account that was not read is named with why", () => {
  expect(noteOf(refreshing({ account: "two", kind: "lapsed", why: "it lapsed" }))).toBe(
    "two was not refreshed — it lapsed"
  )
})

test("only the accounts that were not read are noted", () => {
  expect(
    notesOf([
      refreshing({ account: "one", kind: "read" }),
      refreshing({ account: "two", kind: "absent", why: "no page" }),
    ])
  ).toEqual(["two was not refreshed — no page"])
})
