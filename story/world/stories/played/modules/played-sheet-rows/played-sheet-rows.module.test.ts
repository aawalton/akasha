import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { characterOther } from "akasha/story/character/other/character-other.page-type.ts"
import { characterPlayer } from "akasha/story/character/player/character-player.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { theTowerEmberWave } from "akasha/story/world/pages/personas/mechanics/skills/the-tower-ember-wave.world-skill.ts"
import { theTowerSmithing } from "akasha/story/world/pages/personas/mechanics/skills/the-tower-smithing.world-skill.ts"
import { partnersAlan } from "akasha/story/world/pages/personas/stories/played/partners/characters/partners-alan.character-player.ts"
import { partnersAmy } from "akasha/story/world/pages/personas/stories/played/partners/characters/partners-amy.character-other.ts"
import { theTowerApprentice } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-apprentice.tower-skill-rank.ts"
import { towerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.ts"
import {
  attunementsIn,
  bondsIn,
  namedIn,
  questsIn,
  scoresIn,
  skillsIn,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"

const SMITHING = namedAs(worldSkill.slug, theTowerSmithing.slug, null)

const EMBER_WAVE = namedAs(worldSkill.slug, theTowerEmberWave.slug, null)

const APPRENTICE = namedAs(towerSkillRank.slug, theTowerApprentice.slug, null)

const ALAN = namedAs(characterPlayer.slug, partnersAlan.slug, null)

const AMY = namedAs(characterOther.slug, partnersAmy.slug, null)

const QUEST_ROW = {
  values: {
    slug: "the-kiss",
    title: "The Kiss",
    objective: "kiss her",
    reward: "WILL +1",
    status: "complete",
  },
}

test("the level is the metric whose type ends in level, and the rest are named without its opening", () => {
  const rows = [
    { values: { type: "harem-hotel-might", value: 12 } },
    { values: { type: "harem-hotel-level", value: 2 } },
    { values: { type: "harem-hotel-finesse", value: 15 } },
    { values: { type: "harem-hotel-luck", value: "11" } },
  ]
  expect(scoresIn(rows)).toEqual({ level: 2, attributes: { FINESSE: 15, MIGHT: 12 } })
})

test("a character with no level has every metric named by its whole slug", () => {
  expect(scoresIn([{ values: { type: "partners-mind", value: 3 } }])).toEqual({
    attributes: { "PARTNERS-MIND": 3 },
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

test("a skill whose rank is a number is scored by that rank", () => {
  const titles = new Map([[SMITHING, theTowerSmithing.title]])
  expect(skillsIn([{ values: { skill: SMITHING, rank: 2 } }], titles)).toEqual([
    { name: theTowerSmithing.title, score: 2 },
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

test("a bond is named by the other character in it and counts its points", () => {
  const titles = new Map([[AMY, "Amy"]])
  const rows = [{ values: { characters: [ALAN, AMY], relationshipPoints: 130 } }]
  expect(bondsIn(rows, ALAN, titles)).toEqual([{ name: "Amy", value: 130 }])
  expect(bondsIn([{ values: { characters: [ALAN] } }], ALAN, titles)).toEqual([])
})

test("an attunement is named by its element and rank and counts its counter", () => {
  const titles = new Map([
    ["tower-element/ember", "Ember"],
    ["tower-attunement-rank/affinity", "Affinity"],
  ])
  const rows = [
    {
      values: {
        element: "tower-element/ember",
        rank: "tower-attunement-rank/affinity",
        counter: 9,
      },
    },
    { values: { element: "tower-element/ember", counter: 1 } },
  ]
  expect(attunementsIn(rows, titles)).toEqual([{ name: "Ember Affinity", value: 9 }])
})

test("the pages a row names are gathered by type, from a single address or a list", () => {
  const rows = [{ values: { skill: SMITHING, characters: [ALAN, AMY] } }]
  expect(namedIn(rows, ["skill", "characters"])).toEqual(
    new Map([
      [worldSkill.slug, [theTowerSmithing.slug]],
      [characterPlayer.slug, [partnersAlan.slug]],
      [characterOther.slug, [partnersAmy.slug]],
    ])
  )
})
