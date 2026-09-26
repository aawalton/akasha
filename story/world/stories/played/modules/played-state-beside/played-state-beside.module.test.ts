import { expect, test } from "bun:test"
import { GameStateSchema } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import { towerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
import { towerMana } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts"
import {
  changeIn,
  type Filed,
  linesIn,
  poolsIn,
  stateOver,
} from "akasha/story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts"

const MANA_HISTORY = '{"turn":85,"value":120}\n{"turn":87,"value":110}\n{"turn":88,"value":104}\n'

const HEALTH_HISTORY = '{"turn":85,"value":124}\n{"turn":87,"value":121}\n'

const NOTHING: Filed = {
  pools: {},
  delta: {},
  attributes: {},
  skills: [],
  quests: [],
  bonds: [],
  attunements: [],
  had: null,
}

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

test("a character with nothing filed leaves the state its game kept", () => {
  expect(stateOver(null, NOTHING, 88, "Alan")).toBeNull()
  expect(stateOver({ turn: 3 }, NOTHING, 88, "Alan")).toEqual({ turn: 3 })
})

test("what is filed is drawn over what the game kept, and what it lacks is kept", () => {
  const state = stateOver(
    {
      turn: 3,
      hud: { level: 2, pools: { hp: 5 } },
      revealed: { name: "Alan", skills: ["old"], attributes: { WILL: 18 } },
    },
    { ...NOTHING, pools: { [towerHealth.slug]: 121 } },
    88,
    "Alan"
  )
  expect(state).toEqual({
    turn: 3,
    quests: [],
    hud: { level: 2, pools: { hp: 5, [towerHealth.slug]: 121 }, delta: {} },
    revealed: { name: "Alan", skills: ["old"], attributes: { WILL: 18 } },
  })
})

test("a level, attributes, bonds, attunements and items filed are drawn on the sheet", () => {
  const state = stateOver(
    null,
    {
      ...NOTHING,
      level: 2,
      attributes: { MIGHT: 12 },
      skills: [{ name: "Smithing" }],
      bonds: [{ name: "Amy", value: 130 }],
      attunements: [{ name: "Ember Affinity", value: 9 }],
      had: { worn: { Weapon: { name: "Knife" } }, carried: [{ name: "Coin" }] },
    },
    88,
    "Alan"
  )
  expect(state?.turn).toBe(88)
  expect(state?.hud?.level).toBe(2)
  expect(state?.revealed).toEqual({
    name: "Alan",
    level: 2,
    attributes: { MIGHT: 12 },
    skills: [{ name: "Smithing" }],
    bonds: [{ name: "Amy", value: 130 }],
    affinities: [{ name: "Ember Affinity", value: 9 }],
    equipment: { Weapon: { name: "Knife" } },
    inventory: [{ name: "Coin" }],
  })
  expect(GameStateSchema.safeParse(state).success).toBe(true)
})
