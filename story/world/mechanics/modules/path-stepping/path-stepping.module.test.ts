import { expect, test } from "bun:test"
import {
  basicPaid,
  oneSpeed,
  sped,
} from "akasha/story/world/mechanics/modules/path-stepping/path-stepping.module.code.ts"

const MIND = "metric-character-stat/probe-nala-mental"

const STATS = "gifted-unallocated-stats/probe-nala"

test("a Basic Path's Tiers pay its attribute a point each, past the eighth", () => {
  expect(basicPaid(MIND, STATS, 0, 3)).toEqual([{ page: MIND, key: "value", by: 3 }])
  expect(basicPaid(MIND, STATS, 3, 3)).toEqual([])
})

test("the ninth Tier pays an Unallocated Stat and the tenth two, to the stats named", () => {
  expect(basicPaid(MIND, STATS, 8, 10)).toEqual([{ page: STATS, key: "value", by: 3 }])
  expect(basicPaid(MIND, STATS, 7, 9)).toEqual([
    { page: MIND, key: "value", by: 1 },
    { page: STATS, key: "value", by: 1 },
  ])
})

test("Talented speeds by a fifth of its value and Gifted by two fifths, never both", () => {
  expect(sped(100, { talented: 100 }, Math.floor)).toBe(120)
  expect(sped(100, { gifted: 100 }, Math.floor)).toBe(140)
  expect(sped(100, {}, Math.floor)).toBe(100)
  expect(oneSpeed({ talented: 1, gifted: 1 })).toBe(false)
})
