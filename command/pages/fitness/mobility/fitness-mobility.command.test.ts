import { expect, test } from "bun:test"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  fitnessMobility,
  readingsIn,
  saidOf,
  sayingOf,
  type Way,
  waysIn,
} from "akasha/command/pages/fitness/mobility/fitness-mobility.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha nowhere",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

function reading(on: string, num: number | null, side = "n-a") {
  return {
    mobilityReadingMetric: "supine-slr",
    mobilityReadingDate: on,
    side,
    ...(num === null ? {} : { mobilityReadingValueNum: num }),
  }
}

function way(over: Partial<Way> = {}): Way {
  return {
    metric: "supine-slr",
    side: "n-a",
    readings: 2,
    from: "2026-06-19",
    to: "2026-09-01",
    first: 45,
    last: 60,
    moved: 15,
    ...over,
  }
}

test("a reading with no number is still a reading", () => {
  const held = readingsIn([reading("2026-06-19", null)])
  expect(held[0]?.num).toBe(null)
  expect(held[0]?.on).toBe("2026-06-19")
})

test("a joint's mobility reads as a direction from the first number to the last", () => {
  const ways = waysIn(readingsIn([reading("2026-06-19", 45), reading("2026-09-01", 60)]))
  expect(ways[0]?.moved).toBe(15)
  expect(sayingOf(way())).toContain("gaining 15")
})

test("a joint moving less reads as losing", () => {
  expect(sayingOf(way({ first: 60, last: 45, moved: -15 }))).toContain("losing 15")
})

test("a joint reading the same twice is holding", () => {
  expect(sayingOf(way({ last: 45, moved: 0 }))).toContain("holding")
})

test("a metric with one numbered reading has no direction yet", () => {
  const ways = waysIn(readingsIn([reading("2026-06-19", 45), reading("2026-09-01", null)]))
  expect(ways[0]?.readings).toBe(2)
  expect(ways[0]?.moved).toBe(null)
  expect(sayingOf(way({ moved: null }))).toContain("no direction yet")
})

test("a metric read on one side is answered apart from the other side", () => {
  const ways = waysIn(
    readingsIn([reading("2026-06-19", 45, "left"), reading("2026-06-19", 40, "right")])
  )
  expect(ways.length).toBe(2)
  expect(saidOf(ways)[0]).toBe("supine-slr (left)")
})

test("no reading at all is answered rather than refused", () => {
  expect(saidOf([])[0]).toContain("no joint has a reading")
})

test("a word this takes no argument for is refused", () => {
  const said = fitnessMobility(["stray"], GIVEN)
  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("stray")
})
