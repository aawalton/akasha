import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"
import { GameStateSchema } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import { gameAttribute } from "akasha/story/game/game-attribute/game-attribute.page-type.ts"
import { luck } from "akasha/story/game/game-attribute/pages/luck.game-attribute.ts"
import {
  attributesIn,
  hudOf,
  revealedOf,
  stateOf,
} from "akasha/story/game/game-turn/modules/turn-state/turn-state.module.code.ts"

const LUCK = namedAs(gameAttribute.slug, luck.slug, null)

const PLAYER = asPage({
  id: "player",
  title: "Alan",
  icon: null,
  slug: "the-tower-alan",
  pageTypeId: "",
  type: `${pageType.slug}/game-entity`,
  uniqueKey: null,
  kind: "player",
  level: 7,
  unspentAttributePoints: 3,
  attributes: [{ attribute: LUCK, score: 11 }],
  skills: [{ name: "Smithing", progress: 1, effect: "metalwork" }],
  affinities: [{ name: "Ember", type: "Ember / Heat", tier: "manipulation", counter: 7 }],
  titles: [{ name: "Climber", effect: "climbs" }],
  equipment: [
    { name: "Burning Anger", slot: "weapon", attack: 10 },
    { name: "Lantern", note: "lit" },
  ],
})

const TURN = asPage({
  id: "turn",
  title: null,
  icon: null,
  slug: "the-tower-088",
  pageTypeId: "",
  type: `${pageType.slug}/game-turn`,
  uniqueKey: null,
  number: 88,
  pools: [
    { name: "hp", now: 121, most: 124 },
    { name: "focus", now: 104, most: 120, change: -6 },
  ],
  derived: [{ name: "Vitae (HP)", number: 124 }],
  rungs: [{ name: "Smithing", rung: "Apprentice" }],
})

const QUEST = asPage({
  id: "quest",
  title: "The Kiss",
  icon: null,
  slug: "harem-hotel-kiss",
  pageTypeId: "",
  type: `${pageType.slug}/game-quest`,
  uniqueKey: null,
  objective: "kiss her",
  reward: "WILL +1",
  status: "complete",
})

test("the pools a turn left are keyed by name, and the most each held by name and Max", () => {
  expect(hudOf(PLAYER, TURN)).toEqual({
    level: 7,
    pools: { hp: 121, focus: 104, hpMax: 124, focusMax: 120, attrPoints: 3 },
    delta: { focus: -6 },
  })
})

test("an attribute is keyed by its page's slug in capitals", () => {
  expect(attributesIn([{ attribute: LUCK, score: 11 }])).toEqual({ LUCK: 11 })
})

test("the sheet is the player's page, with the rungs and numbers the turn worked out", () => {
  const sheet = revealedOf(PLAYER, TURN)
  expect(sheet.name).toBe("Alan")
  expect(sheet.level).toBe(7)
  expect(sheet.skills?.[0]).toEqual({
    name: "Smithing",
    rung: "Apprentice",
    score: 1,
    note: "metalwork",
  })
  expect(sheet.affinities?.[0]).toEqual({ name: "Ember", value: 7, note: undefined })
  expect(sheet.equipment).toEqual({ weapon: { name: "Burning Anger" } })
  expect(sheet.inventory).toEqual([{ name: "Lantern", note: "lit" }])
  expect(sheet.titles).toEqual(["Climber"])
  expect(sheet.derived).toEqual({ "Vitae (HP)": 124 })
})

test("the state is the last turn with the player's sheet, and what the reader accepts", () => {
  const state = stateOf([TURN], PLAYER, [QUEST])
  expect(state?.turn).toBe(88)
  expect(state?.revealed?.name).toBe("Alan")
  expect(state?.quests).toEqual([
    {
      id: "harem-hotel-kiss",
      title: "The Kiss",
      objective: "kiss her",
      reward: "WILL +1",
      status: "complete",
    },
  ])
  expect(GameStateSchema.safeParse(state).success).toBe(true)
  expect(stateOf([TURN], null)?.revealed).toBe(undefined)
  expect(stateOf([], PLAYER)).toBe(null)
})
