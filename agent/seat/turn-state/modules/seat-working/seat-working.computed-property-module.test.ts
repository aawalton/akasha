import { expect, test } from "bun:test"
import { TURN_STATE } from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import {
  SEAT_WORKING,
  seatsWorking,
} from "akasha/agent/seat/turn-state/modules/seat-working/seat-working.computed-property-module.code.ts"

const WORKING = { turnState: SEAT_WORKING }

const READY = { turnState: `${TURN_STATE}ready` }

const STOPPED = { turnState: `${TURN_STATE}stopped` }

test("seats are working while one of them is in the working state", () => {
  expect(seatsWorking([READY, WORKING])).toBe(true)
})

test("seats that are idle, stopped or state no turn state are not working", () => {
  expect(seatsWorking([READY, STOPPED, {}])).toBe(false)
})

test("no seat is not working", () => {
  expect(seatsWorking([])).toBe(false)
})
