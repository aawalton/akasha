import { expect, test } from "bun:test"
import { GREEN_DAY_UNITS_LADDER } from "./circle/ladder/ladder.ts"
import {
  drawnAsResolved,
  resolveStoplightMean,
  scoredLightCount,
  type ScoredGroup,
} from "./stoplight-mean-points.ts"

const ALL_RESOLVED: ReadonlyMap<string, string> = new Map()

function group(
  slug: string,
  slugs: readonly string[],
  unresolved: ReadonlyMap<string, string> = ALL_RESOLVED
): ScoredGroup {
  return { slug, readouts: slugs.map((one) => ({ slug: one })), unresolved }
}

test("a persona with no value of its own is the plain mean of the lights that are fixed", () => {
  const tally = resolveStoplightMean({
    fixedFloors: [1, 0.5, 0.25],
    ownValueOtherUnits: null,
    denominator: 6,
    ladder: GREEN_DAY_UNITS_LADDER,
  })
  expect(tally.points).toBeCloseTo(0.2916667, 6)
  expect(tally.lightsCounted).toBe(3)
  expect(tally.iterations).toBe(1)
  expect(tally.ownLightFloor).toBeNull()
})

test("a persona's own light settles against the mean that light is part of", () => {
  const tally = resolveStoplightMean({
    fixedFloors: [1, 1, 1, 1, 1],
    ownValueOtherUnits: 0,
    denominator: 6,
    ladder: GREEN_DAY_UNITS_LADDER,
  })
  expect(tally.ownLightFloor).toBe(0.5)
  expect(tally.points).toBeCloseTo(0.9166667, 6)
  expect(tally.lightsCounted).toBe(6)
})

test("the reading it settles on is the one its own light was drawn against", () => {
  const fixedFloors = [2, 2, 2, 2, 2]
  const denominator = 6
  const tally = resolveStoplightMean({
    fixedFloors,
    ownValueOtherUnits: 0,
    denominator,
    ladder: GREEN_DAY_UNITS_LADDER,
  })
  const fixedSum = fixedFloors.reduce((sum, floor) => sum + floor, 0)
  expect(tally.ownLightFloor).toBe(1)
  expect(tally.points).toBeCloseTo((fixedSum + 1) / denominator, 12)
})

test("it settles within the passes the ladder allows rather than running on", () => {
  const tally = resolveStoplightMean({
    fixedFloors: [0.25, 0.5, 1, 2, 0],
    ownValueOtherUnits: 0.4,
    denominator: 6,
    ladder: GREEN_DAY_UNITS_LADDER,
  })
  expect(tally.iterations).toBeLessThanOrEqual(GREEN_DAY_UNITS_LADDER.length + 2)
})

test("the day is scored out of every light its groups hold", () => {
  const count = scoredLightCount([
    group("upkeep", ["teeth", "bed"]),
    group("inboxes", ["email"]),
    group("values", ["faith", "love", "health"]),
  ])
  expect(count).toBe(6)
})

test("a group that resolved short refuses rather than shrinking the count", () => {
  const short = group("values", ["faith"], new Map([["love", "no page carries it"]]))
  expect(() => scoredLightCount([short])).toThrow(/values/)
  expect(() => scoredLightCount([short])).toThrow(/no page carries it/)
})

test("lights drawn for the day that do not match the group refuse", () => {
  const upkeep = group("upkeep", ["teeth", "bed"])
  expect(() => drawnAsResolved(upkeep, 1)).toThrow(/upkeep/)
  expect(drawnAsResolved(upkeep, 2)).toBeUndefined()
})
