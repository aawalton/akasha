import { expect, test } from "bun:test"
import { towerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
import { towerMana } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts"
import {
  changeIn,
  linesIn,
  poolsIn,
} from "akasha/story/world/stories/played/modules/played-pools/played-pools.module.code.ts"

const MANA_HISTORY = '{"turn":85,"value":120}\n{"turn":87,"value":110}\n{"turn":88,"value":104}\n'

const HEALTH_HISTORY = '{"turn":85,"value":124}\n{"turn":87,"value":121}\n'

test("a history reads as its lines, skipping one that is no turn and value", () => {
  expect(linesIn(`${HEALTH_HISTORY}not json\n{"turn":1}\n`)).toEqual([
    { turn: 85, value: 124 },
    { turn: 87, value: 121 },
  ])
  expect(linesIn("jsonl")).toEqual([])
  expect(linesIn(undefined)).toEqual([])
})

test("the change is the last line less the one before, only where the last is this turn", () => {
  expect(changeIn(linesIn(MANA_HISTORY), 88)).toBe(-6)
  expect(changeIn(linesIn(HEALTH_HISTORY), 88)).toBeUndefined()
  expect(changeIn([{ turn: 88, value: 5 }], 88)).toBeUndefined()
})

test("a pool is keyed by its page type, its most with Max, and holds this turn's change", () => {
  const rows = [
    { values: { type: towerHealth.slug, value: 121, maxValue: 124, history: HEALTH_HISTORY } },
    { values: { type: towerMana.slug, value: 104, maxValue: 120, history: MANA_HISTORY } },
    { values: { type: "tower-stamina", value: "48" } },
    { values: { type: "tower-worded", value: 3, revealedAs: "some" } },
  ]
  expect(poolsIn(rows, 88)).toEqual({
    pools: {
      [towerHealth.slug]: 121,
      [`${towerHealth.slug}Max`]: 124,
      [towerMana.slug]: 104,
      [`${towerMana.slug}Max`]: 120,
    },
    delta: { [towerMana.slug]: -6 },
  })
})
