import { expect, test } from "bun:test"
import {
  lapsed,
  noteOf,
  notesOf,
  type Refreshing,
} from "./claude-account-refreshing.module.code.ts"

const NOW = 1_000_000

function refreshing(one: Partial<Refreshing>): Refreshing {
  return { account: "one", kind: "read", why: null, ...one }
}

test("a token expiring after now has not lapsed", () => {
  expect(lapsed(NOW + 1, NOW)).toBe(false)
})

test("a token expiring at now has lapsed", () => {
  expect(lapsed(NOW, NOW)).toBe(true)
})

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
