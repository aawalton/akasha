import { expect, test } from "bun:test"
import {
  characterFieldsOf,
  differenceLines,
  differencesOf,
  type Field,
  fieldLines,
  itemText,
  SHEET_STATS,
  sectionsOf,
} from "akasha/command/pages/temper/build-show/modules/build-show-fields/build-show-fields.module.code.ts"
import { championPoints } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"

import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()
holdMetricCatalogFromCheckout()

const STAMINA_SORCERER =
  "ATQKpJcAAIBjRwwGyJtABFz_aAEbI-0AIWR9oAQsj7QAjZH2gBCyPtAByAVaADkH3UAHIBVoAMdE_2gBNz_aABxMptoAySfYTyQSZQJSSHsg-QSZZKgkzoqhB2H4GBoBEmYrg8DQDsCw7WjXA-cRORAhFsPqijrTXrhkQoQkQEBkZkBEZkJEBGRqREQARkZoIASEBkSAAIhkRGYHRGaEQHRERMhmRoAAEEREBESUZghERERGAEdZdHjUbkWJOGVjyZZcybOz6NOrXtn0KNKnU8VayxsrZGzx9cvQMWSFoibI3TtIlTJ36hTBVQlcdYYOGyRsCVLAjAMIFDGTQcQJNnBQsYNHDyBEkdJhggMhYxIGoeyqRA"

function decoded(): CharacterState {
  const build = decodeBuild(buildHash(STAMINA_SORCERER))
  if (build === null) throw new Error("the stamina sorcerer hash does not decode")
  return build
}

function valueAt(
  fields: readonly Field[],
  section: string,
  key: string
): string | number | undefined {
  return fields.find((one) => one.section === section && one.key === key)?.value
}

test("an armor piece says its set, weight, kind, quality, trait and enchant", () => {
  const piece = {
    set: "domihaus",
    type: "head",
    weight: "heavy",
    trait: "infused",
    enchantment: "stamina",
    enchantmentQuality: "legendary",
    quality: "epic",
  }
  expect(itemText(piece)).toBe("domihaus, heavy head, epic, infused, enchant stamina (legendary)")
})

test("a slot holding nothing is empty", () => {
  expect(itemText(null)).toBe("empty")
  expect(itemText({ set: "no-set", type: "no-type", trait: "no-trait" })).toBe("empty")
})

test("a companion piece, which has no set or enchant, names neither", () => {
  expect(itemText({ type: "ring-1", trait: "soothing", quality: "epic" })).toBe(
    "ring-1, epic, soothing"
  )
})

test("a weapon carrying a poison names it", () => {
  const sword = {
    set: "agility",
    type: "sword",
    trait: "sharpened",
    quality: "legendary",
    poison: "drain",
  }
  expect(itemText(sword)).toBe("agility, sword, legendary, sharpened, poison drain")
})

test("a decoded build shows its gear, skills, passives and stars", () => {
  const fields = characterFieldsOf(decoded(), null)

  expect(valueAt(fields, "character", "mundus")).toBe("the-tower")
  expect(valueAt(fields, "gear", "head")).toBe(
    "domihaus, heavy head, legendary, infused, enchant stamina (legendary)"
  )
  expect(valueAt(fields, "gear", "back off-hand")).toBe("empty")
  expect(valueAt(fields, "skills: front bar", "ultimate")).toBe("aggressive-horn-40223")
  expect(valueAt(fields, "passives: class", "blood-magic")).toBe("rank 2, sorcerer-dark-magic")
  expect(valueAt(fields, "passives: armor", "heavy-armor-bonuses")).toBe(
    "no rank stated, armor-heavy-armor"
  )
  expect(valueAt(fields, "champion stars: warfare", "points spent")).toBe("not in the hash")
  expect(valueAt(fields, "champion stars: warfare", "master-at-arms")).toBe(
    "slotted, points not in the hash"
  )
})

test("a build's chosen class masteries are shown with their class, and none said where none", () => {
  expect(valueAt(characterFieldsOf(decoded(), null), "masteries", "chosen")).toBe("none")
  const chosen = { ...decoded(), masteries: ["above-and-beyond", "wild-adaptation"] }
  const masteries = characterFieldsOf(chosen, null).filter((one) => one.section === "masteries")
  expect(masteries).toEqual([
    { section: "masteries", key: "above-and-beyond", value: "nightblade" },
    { section: "masteries", key: "wild-adaptation", value: "warden" },
  ])
})

test("each bar has Temper's fifteen stats", () => {
  const fields = characterFieldsOf(decoded(), null)
  for (const bar of ["front", "back"]) {
    const stats = fields.filter((one) => one.section === `stats (Temper): ${bar} bar`)
    expect(stats.map((one) => one.key)).toEqual([...SHEET_STATS])
    expect(stats.every((one) => typeof one.value === "number")).toBe(true)
  }
})

test("a reading's stars give each star its points and the constellation its total", () => {
  const star = championPoints.data["master-at-arms"]
  const fields = characterFieldsOf(decoded(), [
    { championSkillId: star.esoChampionSkillId, points: 30, maxPoints: 50 },
  ])

  expect(valueAt(fields, "champion stars: warfare", "master-at-arms")).toBe(
    "slotted, 30 of 50 points"
  )
  expect(valueAt(fields, "champion stars: warfare", "points spent")).toBe(30)
  expect(valueAt(fields, "champion stars: warfare", "biting-aura")).toBe("slotted, no points")
})

test("a star in another constellation's slot is an empty slot and is left out", () => {
  const build = decoded()
  const craftStar = build.championPoints.craft.slotted[0]
  if (craftStar === undefined) throw new Error("the build slots no craft star")
  const moved: CharacterState = {
    ...build,
    championPoints: {
      ...build.championPoints,
      warfare: { slotted: [craftStar], passive: [] },
    },
  }
  const warfare = characterFieldsOf(moved, null).filter(
    (one) => one.section === "champion stars: warfare"
  )
  expect(warfare.map((one) => one.key)).toEqual(["points spent"])
})

const FIRST: readonly Field[] = [
  { section: "gear", key: "head", value: "a" },
  { section: "gear", key: "chest", value: "b" },
  { section: "passives: class", key: "blood-magic", value: "rank 2" },
  { section: "stats", key: "health-maximum", value: 100 },
]

const SECOND: readonly Field[] = [
  { section: "gear", key: "head", value: "a" },
  { section: "gear", key: "chest", value: "c" },
  { section: "passives: class", key: "rebate", value: "rank 1" },
  { section: "stats", key: "health-maximum", value: 100 },
]

test("two builds differ only where a value differs or one build lacks it", () => {
  expect(differencesOf(FIRST, SECOND)).toEqual([
    { section: "gear", key: "chest", first: "b", second: "c" },
    { section: "passives: class", key: "blood-magic", first: "rank 2", second: null },
    { section: "passives: class", key: "rebate", first: null, second: "rank 1" },
  ])
})

test("a build set against itself has no differences", () => {
  expect(differencesOf(FIRST, FIRST)).toEqual([])
})

test("a value only the second build has falls in its own section", () => {
  const second: readonly Field[] = [...SECOND, { section: "gear", key: "feet", value: "d" }]
  const sections = differencesOf(FIRST, second).map((one) => one.section)
  expect(sections).toEqual(["gear", "gear", "passives: class", "passives: class"])
})

test("differences are shown under their section, the first build's value before the second's", () => {
  expect(differenceLines(differencesOf(FIRST, SECOND))).toEqual([
    "gear",
    "  chest",
    "    - b",
    "    + c",
    "passives: class",
    "  blood-magic",
    "    - rank 2",
    "    + (none)",
    "  rebate",
    "    - (none)",
    "    + rank 1",
  ])
})

test("a build's values are shown under their section with keys lined up", () => {
  expect(fieldLines(FIRST.slice(0, 2))).toEqual(["gear", "  head   a", "  chest  b"])
})

test("a build's values are grouped by section for JSON", () => {
  expect(sectionsOf(FIRST)).toEqual({
    gear: { head: "a", chest: "b" },
    "passives: class": { "blood-magic": "rank 2" },
    stats: { "health-maximum": 100 },
  })
})
