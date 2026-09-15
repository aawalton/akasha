import { expect, test } from "bun:test"
import {
  assignmentFor,
  messageFor,
  noSeat,
  notRunning,
  type Seated,
  saidFor,
  seatFor,
  seatNameFor,
} from "akasha/command/pages/initiative/assign/initiative-assign.command.code.ts"

const AMY = "amy-harness-improvements"

const AINE = "aine-resource-management"

const NOWHERE = "nowhere"

function seatedAs(name: string, running: boolean): Seated {
  return { name, at: `${NOWHERE}/${name}/${name}.seat.ts`, running }
}

test("a seat is named by the segment an initiative opens with", () => {
  expect(seatNameFor(AMY)).toBe("amy")
  expect(seatNameFor(AINE)).toBe("aine")
})

test("an initiative of one segment names the seat of that whole slug", () => {
  expect(seatNameFor("amy")).toBe("amy")
})

test("a running seat takes the initiative its name opens", () => {
  expect(seatFor(AMY, seatedAs("amy", true))).toEqual({
    name: "amy",
    at: `${NOWHERE}/amy/amy.seat.ts`,
  })
})

test("a seat that has no page is refused in words naming that seat", () => {
  expect(seatFor(AMY, null)).toEqual({ refused: noSeat("amy", AMY) })
  expect(noSeat("amy", AMY)).toBe(
    "`amy` is no seat, so amy-harness-improvements was assigned to nobody"
  )
})

test("a seat whose agent is not present is refused in words naming that seat", () => {
  expect(seatFor(AINE, seatedAs("aine", false))).toEqual({ refused: notRunning("aine", AINE) })
  expect(notRunning("aine", AINE)).toBe(
    "the seat aine is not running, so aine-resource-management was assigned to nobody"
  )
})

test("what a seat already answers to is no part of what is read of that seat", () => {
  expect(Object.keys(seatedAs("amy", true)).sort()).toEqual(["at", "name", "running"])
})

test("the assignment stated names the initiative under the initiative page type", () => {
  expect(assignmentFor(AMY)).toBe("initiative/amy-harness-improvements")
})

test("the commit message names the initiative and the seat", () => {
  expect(messageFor("amy", AMY)).toBe("assign amy-harness-improvements to amy")
})

test("a run says what the seat answers to and the commit that run landed", () => {
  expect(saidFor("amy", AMY, "abc1234")).toEqual([
    "amy answers to initiative/amy-harness-improvements",
    "abc1234",
  ])
  expect(saidFor("amy", AMY, null)).toEqual(["amy answers to initiative/amy-harness-improvements"])
})
