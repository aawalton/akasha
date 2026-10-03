import { expect, test } from "bun:test"
import { GameStateSchema } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import { towerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
import { revealedRows } from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"
import {
  type Filed,
  stateOf,
} from "akasha/story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts"

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

test("a purse filed is drawn on the sheet, and alone is still a state", () => {
  const state = stateOf({ ...NOTHING, purse: { Crowns: "4 crown" } }, 88, "Alan")
  expect(state?.revealed).toEqual({ name: "Alan", purse: { Crowns: "4 crown" } })
  expect(GameStateSchema.safeParse(state).success).toBe(true)
})

test("a purse's ledger filed is drawn on the sheet beside the purse", () => {
  const ledgers = { Crowns: [{ turn: 4, change: "+4 crown", total: "4 crown" }] }
  const state = stateOf({ ...NOTHING, purse: { Crowns: "4 crown" }, ledgers }, 88, "Alan")
  expect(state?.revealed).toEqual({ name: "Alan", purse: { Crowns: "4 crown" }, ledgers })
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

test("a rank filed is drawn on the sheet beside the class, and alone is still a state", () => {
  const state = stateOf({ ...NOTHING, calling: "Berserker", rank: "E" }, 1, "Tamsin")
  expect(state?.revealed).toEqual({ name: "Tamsin", class: "Berserker", rank: "E" })
  expect(stateOf({ ...NOTHING, rank: "F" }, 1, "Tilly")?.revealed).toEqual({
    name: "Tilly",
    rank: "F",
  })
  expect(GameStateSchema.safeParse(state).success).toBe(true)
})
