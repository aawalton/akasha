import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { GameStateSchema } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { theTowerEmberWave } from "akasha/story/world/pages/personas/mechanics/skills/the-tower-ember-wave.world-skill.ts"
import { theTowerSmithing } from "akasha/story/world/pages/personas/mechanics/skills/the-tower-smithing.world-skill.ts"
import { towerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-health/tower-health.page-type.ts"
import { towerMana } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-mana/tower-mana.page-type.ts"
import { theTowerApprentice } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-apprentice.tower-skill-rank.ts"
import { towerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.ts"
import {
  changeIn,
  linesIn,
  poolsIn,
  questsIn,
  skillsIn,
  stateOver,
} from "akasha/story/world/stories/played/modules/played-state-beside/played-state-beside.module.code.ts"

const MANA_HISTORY = '{"turn":85,"value":120}\n{"turn":87,"value":110}\n{"turn":88,"value":104}\n'

const HEALTH_HISTORY = '{"turn":85,"value":124}\n{"turn":87,"value":121}\n'

const SMITHING = namedAs(worldSkill.slug, theTowerSmithing.slug, null)

const EMBER_WAVE = namedAs(worldSkill.slug, theTowerEmberWave.slug, null)

const APPRENTICE = namedAs(towerSkillRank.slug, theTowerApprentice.slug, null)

const NOTHING = { pools: {}, delta: {}, skills: [], quests: [] }

const QUEST_ROW = {
  values: {
    slug: "the-kiss",
    title: "The Kiss",
    objective: "kiss her",
    reward: "WILL +1",
    status: "complete",
  },
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

test("a skill is named by the skill page's title and ranked by the rank page's title", () => {
  const titles = new Map([
    [SMITHING, theTowerSmithing.title],
    [EMBER_WAVE, theTowerEmberWave.title],
    [APPRENTICE, theTowerApprentice.title],
  ])
  const rows = [
    { values: { skill: SMITHING, rank: APPRENTICE, level: 1 } },
    { values: { skill: EMBER_WAVE, level: 3, axis: "the form" } },
    { values: { skill: "unknown", level: 2 } },
  ]
  expect(skillsIn(rows, titles)).toEqual([
    { name: theTowerEmberWave.title, score: 3, note: "the form" },
    { name: theTowerSmithing.title, rank: theTowerApprentice.title, score: 1 },
  ])
})

test("a quest is keyed by its page's slug, and any status but complete is active", () => {
  expect(questsIn([QUEST_ROW, { values: { slug: "x", title: "X", objective: "y" } }])).toEqual([
    {
      id: "the-kiss",
      title: "The Kiss",
      objective: "kiss her",
      reward: "WILL +1",
      status: "complete",
    },
    { id: "x", title: "X", objective: "y", status: "active" },
  ])
  expect(questsIn([{ values: { slug: "x", title: "X" } }])).toEqual([])
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
    { pools: { [towerHealth.slug]: 121 }, delta: {}, skills: [], quests: [] },
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

test("a story with nothing kept draws only what is filed, as the reader accepts it", () => {
  const state = stateOver(
    null,
    {
      pools: { [towerHealth.slug]: 121 },
      delta: {},
      skills: [{ name: "Smithing" }],
      quests: questsIn([QUEST_ROW]),
    },
    88,
    "Alan"
  )
  expect(state?.turn).toBe(88)
  expect(state?.revealed).toEqual({ name: "Alan", skills: [{ name: "Smithing" }] })
  expect(GameStateSchema.safeParse(state).success).toBe(true)
})
