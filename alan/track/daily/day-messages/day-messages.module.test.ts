import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  type Counted,
  countedIn,
  messagesOn,
  raisedIn,
  raiseMessagesOn,
  sentIn,
} from "./day-messages.module.code.ts"

const HOLD = "/var/tmp"

const DAY = "alan/track/daily/days/pages/2026-09-08/day-2026-09-08.day.ts"

const TWO: readonly Counted[] = [
  { persona: "aura", sent: 4 },
  { persona: "amy", sent: 9 },
]

const rootMade = () => mkdtempSync(join(HOLD, "day-messages-"))

test("a value that is no list is no count at all", () => {
  expect(countedIn(undefined)).toEqual([])
})

test("a row missing a name is passed over", () => {
  expect(countedIn([{ sent: 3 }, { persona: "aura", sent: 4 }])).toEqual([
    { persona: "aura", sent: 4 },
  ])
})

test("a row missing a count is passed over", () => {
  expect(countedIn([{ persona: "amy" }])).toEqual([])
})

test("a persona counted that day reads back her count", () => {
  expect(sentIn(TWO, "amy")).toBe(9)
})

test("a persona counted on no row reads back as unread rather than as a zero", () => {
  expect(sentIn(TWO, "ione")).toBeNull()
})

test("a persona written to for the first time that day arrives at one", () => {
  expect(raisedIn([], "aura")).toEqual([{ persona: "aura", sent: 1 }])
})

test("a persona already counted has her count raised by one", () => {
  expect(raisedIn(TWO, "aura")).toEqual([
    { persona: "aura", sent: 5 },
    { persona: "amy", sent: 9 },
  ])
})

test("the personas already counted keep the order they were counted in", () => {
  expect(raisedIn(TWO, "ione").map((one) => one.persona)).toEqual(["aura", "amy", "ione"])
})

test("a day carrying nothing counts nobody", () => {
  const root = rootMade()
  try {
    expect(messagesOn(root, DAY)).toEqual([])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a count raised beside a day reads back off that day", () => {
  const root = rootMade()
  try {
    raiseMessagesOn(root, DAY, "aura")
    raiseMessagesOn(root, DAY, "amy")
    raiseMessagesOn(root, DAY, "aura")
    expect(messagesOn(root, DAY)).toEqual([
      { persona: "aura", sent: 2 },
      { persona: "amy", sent: 1 },
    ])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
