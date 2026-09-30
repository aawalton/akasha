import { expect, test } from "bun:test"
import { GameStateSchema } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import { towerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
import { towerMana } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts"
import {
  changeIn,
  type Filed,
  linesIn,
  poolsIn,
  revealedRows,
  stateOf,
} from "akasha/story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts"

const MANA_HISTORY = '{"turn":85,"value":120}\n{"turn":87,"value":110}\n{"turn":88,"value":104}\n'

const HEALTH_HISTORY = '{"turn":85,"value":124}\n{"turn":87,"value":121}\n'

const NOTHING: Filed = {
  pools: {},
  delta: {},
  attributes: {},
  skills: [],
  traits: [],
  legacies: [],
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

test("a page stating it is unrevealed is dropped, and every other page is kept", () => {
  const rows = [
    { values: { type: "a-stat", value: 3, unrevealed: true } },
    { values: { type: "b-stat", value: 4, unrevealed: false } },
    { values: { type: "c-stat", value: 5 } },
  ]
  expect(revealedRows(rows).map((row) => row.values["type"])).toEqual(["b-stat", "c-stat"])
})

test("a character with nothing filed has no state", () => {
  expect(stateOf(NOTHING, 88, "Alan")).toBeNull()
})

test("the pools filed are the hud, and the name heads the sheet", () => {
  expect(stateOf({ ...NOTHING, pools: { [towerHealth.slug]: 121 } }, 88, "Alan")).toEqual({
    turn: 88,
    quests: [],
    hud: { pools: { [towerHealth.slug]: 121 }, delta: {} },
    revealed: { name: "Alan" },
  })
})

test("a level, attributes, traits, bonds, attunements and items filed are drawn on the sheet", () => {
  const state = stateOf(
    {
      ...NOTHING,
      level: 2,
      attributes: { MIGHT: 12 },
      skills: [{ name: "Smithing" }],
      traits: [{ name: "Keen Nose", score: 1, note: "smells far" }],
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
    traits: [{ name: "Keen Nose", score: 1, note: "smells far" }],
    bonds: [{ name: "Amy", value: 130 }],
    affinities: [{ name: "Ember Affinity", value: 9 }],
    equipment: { Weapon: { name: "Knife" } },
    inventory: [{ name: "Coin" }],
  })
  expect(GameStateSchema.safeParse(state).success).toBe(true)
})

test("a species, class, status and legacies filed are drawn on the sheet", () => {
  const state = stateOf(
    {
      ...NOTHING,
      species: "Human",
      calling: "Ranger",
      status: "Healthy",
      legacies: [{ name: "Starfall", score: 1 }],
    },
    88,
    "Alan"
  )
  expect(state?.revealed).toEqual({
    name: "Alan",
    kind: "Human",
    class: "Ranger",
    status: "Healthy",
    legacies: [{ name: "Starfall", score: 1 }],
  })
  expect(GameStateSchema.safeParse(state).success).toBe(true)
})
