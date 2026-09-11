import { expect, test } from "bun:test"
import type { Reach } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import {
  LADDER,
  levelOf,
  work,
} from "akasha/personas/properties/persona-relationship-level.computed-property.code.ts"
import {
  RUNGS,
  rungAt,
} from "akasha/personas/properties/persona-relationship-level.computed-property.test-fixtures.ts"

const REACH = {
  target: (slug: string) => {
    const rung = RUNGS[Number(slug.slice(LADDER.length))]
    return rung === undefined ? null : { pointsToHere: rung }
  },
  naming: () => [],
} as Reach

test("a persona short of the first rung is level 0", () => {
  expect(levelOf(6.99, rungAt)).toBe(0)
})

test("no points at all is level 0", () => {
  expect(levelOf(0, rungAt)).toBe(0)
})

test("points below zero are level 0", () => {
  expect(levelOf(-5, rungAt)).toBe(0)
})

test("the first rung reached is level 1", () => {
  expect(levelOf(7, rungAt)).toBe(1)
})

test("each rung of the ladder is reached at the points that rung states", () => {
  expect([7, 28, 88, 268, 808, 2428].map((points) => levelOf(points, rungAt))).toEqual([
    1, 2, 3, 4, 5, 6,
  ])
})

test("points short of the next rung leave the level where it was", () => {
  expect(levelOf(87, rungAt)).toBe(2)
})

test("points past the last rung stay at the last rung", () => {
  expect(levelOf(100000, rungAt)).toBe(6)
})

test("a total on the page is worked into a level through the ladder", () => {
  expect(work({ pointsTotal: 268 }, REACH)).toBe(4)
})

test("a persona carrying no total at all is level 0", () => {
  expect(work({}, REACH)).toBe(0)
})
