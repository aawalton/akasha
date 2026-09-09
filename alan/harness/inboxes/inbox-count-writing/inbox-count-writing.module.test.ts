import { expect, test } from "bun:test"
import { alreadyThere, keptLow } from "./inbox-count-writing.module.code.ts"

const TASKS = "inbox-tasks"

const CLEARED = "inbox-tasks-cleared-today"

const ATTRS = { [TASKS]: 5, [CLEARED]: false } as const

test("counts the day already carries are not landed again", () => {
  expect(alreadyThere(ATTRS, { [TASKS]: 5, [CLEARED]: false })).toBe(true)
})

test("a count already on the day is read as the number that count spells", () => {
  expect(alreadyThere(ATTRS, { [TASKS]: "5", [CLEARED]: false })).toBe(true)
})

test("a count that moved is landed", () => {
  expect(alreadyThere(ATTRS, { [TASKS]: 4, [CLEARED]: false })).toBe(false)
})

test("a mark that moved is landed", () => {
  expect(alreadyThere(ATTRS, { [TASKS]: 5, [CLEARED]: true })).toBe(false)
})

test("a day carrying no count of its own is landed", () => {
  expect(alreadyThere(ATTRS, {})).toBe(false)
})

test("a day nothing is written down for is landed", () => {
  expect(alreadyThere(ATTRS, undefined)).toBe(false)
})

test("a run counting nothing lands nothing on a day that is written down", () => {
  expect(alreadyThere({}, { [TASKS]: 5 })).toBe(true)
})

test("a mail count lower than the count already there is kept", () => {
  expect(keptLow(4, 1)).toBe(1)
})

test("a mail count no lower than the count already there is not kept", () => {
  expect(keptLow(1, 4)).toBeNull()
  expect(keptLow(1, 1)).toBeNull()
})

test("a mail count on a day carrying none is kept", () => {
  expect(keptLow(undefined, 4)).toBe(4)
})

test("a mail count already there as text is read as the number that count spells", () => {
  expect(keptLow("4", 1)).toBe(1)
  expect(keptLow("1", 4)).toBeNull()
})

test("a mail count of zero is kept over a count above zero", () => {
  expect(keptLow(1, 0)).toBe(0)
})
