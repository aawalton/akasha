import { expect, test } from "bun:test"
import { type Held, seatOfTerminal } from "./seat-terminal-enter.module.code.ts"

const AMY = { at: "amy" }

const OPS = { at: "ops" }

const LOOSE = { at: "loose" }

const SEATS: readonly Held[] = [
  { terminal: AMY, name: "amy" },
  { terminal: OPS, name: "ops" },
]

test("a terminal the sweep named answers that terminal's seat", () => {
  expect(seatOfTerminal(SEATS, AMY)).toBe("amy")
  expect(seatOfTerminal(SEATS, OPS)).toBe("ops")
})

test("a terminal the sweep did not name answers no seat", () => {
  expect(seatOfTerminal(SEATS, LOOSE)).toBe(undefined)
  expect(seatOfTerminal([], AMY)).toBe(undefined)
})

test("no focused terminal answers no seat", () => {
  expect(seatOfTerminal(SEATS, undefined)).toBe(undefined)
})

test("a terminal is matched by being the same object rather than by what it carries", () => {
  expect(seatOfTerminal(SEATS, { at: "amy" })).toBe(undefined)
})
