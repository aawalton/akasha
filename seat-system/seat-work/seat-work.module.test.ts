import { expect, test } from "bun:test"
import { foldSeatWork, louder, type SeatHolding } from "./seat-work.module.code.ts"

const WORK = "a-thing-to-do"

function held(over: Partial<SeatHolding> = {}): SeatHolding {
  return { initiative: WORK, state: "idle", color: "yellow", ...over }
}

const WORKING = held({ state: "working", color: "green" })

const READY = held({ state: "ready", color: "green" })

const WAITING = held({ state: "idle-pending", color: "blue" })

const IDLE = held({ state: "idle", color: "yellow" })

const STOPPED = held({ state: "stopped", color: "text" })

test("green outranks blue", () => {
  expect(louder(READY, WAITING)).toBe(READY)
  expect(louder(WAITING, READY)).toBe(READY)
})

test("blue outranks yellow", () => {
  expect(louder(WAITING, IDLE)).toBe(WAITING)
  expect(louder(IDLE, WAITING)).toBe(WAITING)
})

test("yellow outranks every other color", () => {
  expect(louder(IDLE, STOPPED)).toBe(IDLE)
  expect(louder(STOPPED, IDLE)).toBe(IDLE)
})

test("a color the ranking does not name sits below every color the ranking names", () => {
  expect(louder(STOPPED, WORKING)).toBe(WORKING)
  expect(louder(STOPPED, WAITING)).toBe(WAITING)
  expect(louder(STOPPED, IDLE)).toBe(IDLE)
})

test("a state whose page named no color to read sits in that same place", () => {
  const unread = held({ state: "working", color: null })

  expect(louder(unread, IDLE)).toBe(IDLE)
})

test("two states drawn in one color are settled by the order the states are read in", () => {
  expect(louder(READY, WORKING)).toBe(WORKING)
  expect(louder(WORKING, READY)).toBe(WORKING)
})

test("an initiative takes the loudest color any seat working it is drawn in", () => {
  const work = foldSeatWork([IDLE, READY, WAITING])

  expect(work.byInitiative.get(WORK)).toBe("ready")
})

test("a seat working no initiative is left out", () => {
  const work = foldSeatWork([held({ initiative: null, state: "working", color: "green" })])

  expect(work.byInitiative.size).toBe(0)
})
