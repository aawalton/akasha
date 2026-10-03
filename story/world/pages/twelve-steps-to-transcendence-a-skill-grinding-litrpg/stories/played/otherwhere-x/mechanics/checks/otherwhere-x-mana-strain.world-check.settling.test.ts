import { expect, test } from "bun:test"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { metricCharacterMana } from "akasha/story/world/mechanics/metrics/metric-character/resource/mana/metric-character-mana.page-type.ts"
import { otherwhereXNala } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/characters/otherwhere-x-nala.character-player.ts"
import {
  added,
  maxManaOf,
  settled,
} from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/checks/otherwhere-x-mana-strain.world-check.settling.code.ts"

const NALA = { character: `${characterPlayer.slug}/${otherwhereXNala.slug}`, tier: 1 }

test("a Tier 1 all on the mana path holds four times the base", () => {
  expect(maxManaOf(1, 100)).toBe(80)
  expect(maxManaOf(1, 0)).toBe(20)
  expect(maxManaOf(2, 50)).toBe(150)
})

test("spending within her mana leaves no strain", () => {
  expect(settled({ ...NALA, manaPathPercent: 100, mana: 80, spent: 30 })).toEqual({
    answered: { maxMana: 80, mana: 50, overdrawn: 0, strain: "none", harm: 0, bonus: 0 },
  })
})

test("overdrawing a quarter of her most mana aches", () => {
  expect(settled({ ...NALA, manaPathPercent: 0, mana: 5, spent: 10 })).toEqual({
    answered: { maxMana: 20, mana: 0, overdrawn: 5, strain: "ache", harm: 0, bonus: -1 },
  })
})

test("overdrawing her whole most mana brings a nosebleed and harm", () => {
  expect(settled({ ...NALA, manaPathPercent: 0, mana: 0, spent: 20 })).toHaveProperty(
    "answered.strain",
    "nosebleed"
  )
})

test("overdrawing past that collapses her", () => {
  expect(settled({ ...NALA, manaPathPercent: 0, mana: 0, spent: 30 })).toHaveProperty(
    "answered.harm",
    6
  )
})

test("a Tier 0 has no mana to draw and is refused", () => {
  expect(settled({ ...NALA, tier: 0, manaPathPercent: 0, mana: 0, spent: 1 })).toHaveProperty(
    "refused"
  )
})

test("mana past her most mana is refused", () => {
  expect(settled({ ...NALA, manaPathPercent: 0, mana: 30, spent: 1 })).toHaveProperty("refused")
})

test("the mana spent comes off her mana page", () => {
  const reading = { ...NALA, manaPathPercent: 100, mana: 80, spent: 30 }
  const answered = settled(reading)
  expect(added(reading, "answered" in answered ? answered.answered : null)).toEqual([
    { page: `${metricCharacterMana.slug}/${otherwhereXNala.slug}`, key: "value", by: -30 },
  ])
})
