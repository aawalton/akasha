import { expect, test } from "bun:test"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { characterOther } from "akasha/story/world/characters/character-other/character-other.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { worldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.ts"
import { theTowerEmberWave } from "akasha/story/world/pages/personas/mechanics/skills/the-tower-ember-wave.world-skill.ts"
import { theTowerSmithing } from "akasha/story/world/pages/personas/mechanics/skills/the-tower-smithing.world-skill.ts"
import { theTowerAlan } from "akasha/story/world/pages/personas/stories/played/the-tower/characters/the-tower-alan.character-player.ts"
import { theTowerCompanionAelwyn } from "akasha/story/world/pages/personas/stories/played/the-tower/characters/the-tower-companion-aelwyn.character-other.ts"
import { theTowerApprentice } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/pages/the-tower-apprentice.tower-skill-rank.ts"
import { towerSkillRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/skills/ranks/tower-skill-rank.page-type.ts"
import {
  attunementsIn,
  bondsIn,
  heldIn,
  namedIn,
  questsIn,
  resourcesIn,
  scoresIn,
  skillsIn,
  traitsIn,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"

const SMITHING = namedAs(worldSkill.slug, theTowerSmithing.slug, null)

const EMBER_WAVE = namedAs(worldSkill.slug, theTowerEmberWave.slug, null)

const APPRENTICE = namedAs(towerSkillRank.slug, theTowerApprentice.slug, null)

const ALAN = namedAs(characterPlayer.slug, theTowerAlan.slug, null)

const AELWYN = namedAs(characterOther.slug, theTowerCompanionAelwyn.slug, null)

const QUEST_ROW = {
  values: {
    slug: "the-kiss",
    title: "The Kiss",
    objective: "kiss her",
    status: "complete",
  },
}

test("the level is the metric whose type ends in level, and the rest are named without its opening", () => {
  const rows = [
    { values: { type: "tower-might", value: 12 } },
    { values: { type: "tower-level", value: 2 } },
    { values: { type: "tower-finesse", value: 15 } },
    { values: { type: "tower-luck", value: "11" } },
  ]
  expect(scoresIn(rows)).toEqual({ level: 2, attributes: { FINESSE: 15, MIGHT: 12 } })
})

test("a character with no level has every metric named by its whole slug", () => {
  expect(scoresIn([{ values: { type: "otherwhere-strength", value: 3 } }])).toEqual({
    attributes: { "OTHERWHERE-STRENGTH": 3 },
  })
})

test("pages sharing one type are named by what each slug adds to the character's, or by a title", () => {
  const holder = "character-player/some-nala"
  const rows = [
    { values: { type: "some-stat", value: 8, slug: "some-nala-strength", character: holder } },
    { values: { type: "some-stat", value: 10, slug: "some-nala-dexterity", character: holder } },
    { values: { type: "some-stat", value: 4, title: "Keen Eye", slug: "x", character: holder } },
    { values: { type: "some-level", value: 2, slug: "some-nala", character: holder } },
  ]
  expect(scoresIn(rows)).toEqual({
    level: 2,
    attributes: { DEXTERITY: 10, "KEEN EYE": 4, STRENGTH: 8 },
  })
})

test("a resource is named by its kind, by what its slug adds, or by its title, and counts against its most", () => {
  const holder = "character-player/some-nala"
  const rows = [
    {
      values: {
        type: "some-health",
        value: 40,
        maxValue: 45,
        slug: "some-nala",
        character: holder,
      },
    },
    { values: { type: "some-reserve", value: 19, slug: "some-nala-wind", character: holder } },
    { values: { type: "some-purse", value: 3, title: "Coin", slug: "x", character: holder } },
    { values: { type: "some-mana", character: holder } },
  ]
  expect(resourcesIn(rows)).toEqual({ COIN: 3, HEALTH: "40 / 45", "WIND RESERVE": 19 })
})

test("a resource the story gave only in words is shown as those words, never its numbers", () => {
  const holder = "character-player/some-nala"
  const rows = [
    {
      values: {
        type: "some-health",
        value: 40,
        maxValue: 45,
        revealedAs: "hale",
        character: holder,
      },
    },
    { values: { type: "some-mana", value: 7, maxValue: 9, revealedAs: " ", character: holder } },
  ]
  expect(resourcesIn(rows)).toEqual({ HEALTH: "hale", MANA: "7 / 9" })
})

test("resources stating a display order come first in that order, and the rest by name", () => {
  const holder = "character-player/some-nala"
  const rows = [
    { values: { type: "some-reserve", value: 2, slug: "some-nala-wind", character: holder } },
    { values: { type: "some-stamina", value: 3, displayOrder: 3, character: holder } },
    { values: { type: "some-reserve", value: 1, slug: "some-nala-earth", character: holder } },
    { values: { type: "some-health", value: 5, displayOrder: 1, character: holder } },
    { values: { type: "some-mana", value: 4, displayOrder: 2, character: holder } },
  ]
  expect(Object.keys(resourcesIn(rows))).toEqual([
    "HEALTH",
    "MANA",
    "STAMINA",
    "EARTH RESERVE",
    "WIND RESERVE",
  ])
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

test("a skill's note is its skill page's description, over the note its holding names", () => {
  const titles = new Map([
    [SMITHING, theTowerSmithing.title],
    [EMBER_WAVE, theTowerEmberWave.title],
  ])
  const descriptions = new Map([[SMITHING, "shapes metal"]])
  const rows = [
    { values: { skill: SMITHING, level: 1, axis: "the form" } },
    { values: { skill: EMBER_WAVE, level: 3, axis: "the form" } },
  ]
  expect(skillsIn(rows, titles, descriptions)).toEqual([
    { name: theTowerEmberWave.title, score: 3, note: "the form" },
    { name: theTowerSmithing.title, score: 1, note: "shapes metal" },
  ])
})

test("a skill whose rank is a number is scored by that rank", () => {
  const titles = new Map([[SMITHING, theTowerSmithing.title]])
  expect(skillsIn([{ values: { skill: SMITHING, rank: 2 } }], titles)).toEqual([
    { name: theTowerSmithing.title, score: 2 },
  ])
})

test("a skill holding naming no skill page is named and noted by itself", () => {
  const rows = [{ values: { title: "Undertow", description: "a pull on water", talent: "x/y" } }]
  expect(skillsIn(rows, new Map())).toEqual([{ name: "Undertow", note: "a pull on water" }])
})

test("a held kind is named and noted by the page its relation names, or by the holding itself", () => {
  const named = "some-legacy/some-starfall"
  const titles = new Map([[named, "Starfall"]])
  const descriptions = new Map([[named, "a fallen star"]])
  const holder = "character-player/some-nala"
  const rows = [
    { values: { legacy: named, rank: 1, character: holder, slug: "some-nala-starfall" } },
    { values: { title: "Human", character: holder } },
    { values: { legacy: "some-legacy/unknown" } },
  ]
  expect(heldIn(rows, "legacy", titles, descriptions)).toEqual([
    { name: "Human" },
    { name: "Starfall", score: 1, note: "a fallen star" },
  ])
})

test("a trait is named and noted by the trait page its holding names, and scored by its rank", () => {
  const named = "some-trait/some-weaving"
  const titles = new Map([[named, "Weaving"]])
  const descriptions = new Map([[named, "a knack for threads"]])
  const rows = [
    { values: { trait: named, rank: 2, title: "Nala's Weaving" } },
    { values: { title: "Keen Nose", description: "smells far", rank: 1 } },
    { values: { trait: "some-trait/unknown" } },
  ]
  expect(traitsIn(rows, titles, descriptions)).toEqual([
    { name: "Keen Nose", score: 1, note: "smells far" },
    { name: "Weaving", score: 2, note: "a knack for threads" },
  ])
})

test("a quest is keyed by its page's slug, and any status but complete is active", () => {
  expect(questsIn([QUEST_ROW, { values: { slug: "x", title: "X", objective: "y" } }])).toEqual([
    {
      id: "the-kiss",
      title: "The Kiss",
      objective: "kiss her",
      status: "complete",
    },
    { id: "x", title: "X", objective: "y", status: "active" },
  ])
  expect(questsIn([{ values: { slug: "x", title: "X" } }])).toEqual([])
})

test("a bond is named by the other character in it and counts its points", () => {
  const titles = new Map([[AELWYN, "Aelwyn"]])
  const rows = [{ values: { characters: [ALAN, AELWYN], relationshipPoints: 130 } }]
  expect(bondsIn(rows, ALAN, titles)).toEqual([{ name: "Aelwyn", value: 130 }])
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
  const rows = [{ values: { skill: SMITHING, characters: [ALAN, AELWYN] } }]
  expect(namedIn(rows, ["skill", "characters"])).toEqual(
    new Map([
      [worldSkill.slug, [theTowerSmithing.slug]],
      [characterPlayer.slug, [theTowerAlan.slug]],
      [characterOther.slug, [theTowerCompanionAelwyn.slug]],
    ])
  )
})
