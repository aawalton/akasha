import { expect, test } from "bun:test"
import { reserveNoveltySlot, type StarvedSlot } from "./novelty-budget.module.code.ts"

function starved(slotIndex: number, patternUntrained = false): StarvedSlot {
  return { slotIndex, patternUntrained }
}

test("a session with no starved slot reserves nothing", () => {
  expect(reserveNoveltySlot([])).toBeNull()
})

test("one starved slot takes the introduction", () => {
  expect(reserveNoveltySlot([starved(3)])).toBe(3)
})

test("the earliest starved slot takes it where none is untrained", () => {
  expect(reserveNoveltySlot([starved(4), starved(1), starved(2)])).toBe(1)
})

test("an untrained pattern takes it ahead of an earlier trained one", () => {
  expect(reserveNoveltySlot([starved(1), starved(3, true)])).toBe(3)
})

test("the earliest untrained pattern takes it where several are untrained", () => {
  expect(reserveNoveltySlot([starved(4, true), starved(2, true), starved(0)])).toBe(2)
})

test("the order the slots arrive in changes nothing", () => {
  const slots = [starved(5), starved(2, true), starved(1)]
  expect(reserveNoveltySlot(slots)).toBe(2)
  expect(reserveNoveltySlot([...slots].reverse())).toBe(2)
})

test("nothing handed in is reordered", () => {
  const slots = [starved(5), starved(1)]
  reserveNoveltySlot(slots)
  expect(slots.map((slot) => slot.slotIndex)).toEqual([5, 1])
})
