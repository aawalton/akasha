import { expect, test } from "bun:test"
import {
  added,
  levelCost,
  settled,
} from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/checks/otherwhere-x-growth.world-check.settling.code.ts"
import { otherwhereXEssence } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/metrics/resources/essence/otherwhere-x-essence.page-type.ts"
import { otherwhereXNala } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/metrics/resources/essence/pages/otherwhere-x-nala.otherwhere-x-essence.ts"

const NALA = { character: "otherwhere-x-nala", essence: 0, cycling: false }

const READING = { ability: "speed reading", held: { level: 1, rarity: "common" } }

test("at Tier 0 practice banks and no level rises", () => {
  expect(
    settled({ ...NALA, tier: 0, uses: [{ ...READING, banked: 3, practiceHours: 2 }] })
  ).toHaveProperty("answered.uses", [
    {
      ability: "speed reading",
      points: 2,
      banked: 5,
      level: 1,
      rarity: "common",
      levelsGained: 0,
      atPinnacle: false,
      offered: false,
    },
  ])
})

test("at Tier 1 banked points buy levels and the rest stays banked", () => {
  expect(settled({ ...NALA, tier: 1, uses: [{ ...READING, practiceHours: 5 }] })).toHaveProperty(
    "answered.uses.0",
    {
      ability: "speed reading",
      points: 5,
      banked: 3,
      level: 2,
      rarity: "common",
      levelsGained: 1,
      atPinnacle: false,
      offered: false,
    }
  )
})

test("the last two levels of a rank cost twice as much", () => {
  expect(levelCost(7, "common")).toBe(14)
  expect(levelCost(8, "common")).toBe(32)
  expect(levelCost(18, "uncommon")).toBe(144)
})

test("a fight for her life counts thirty points an hour", () => {
  expect(
    settled({
      ...NALA,
      tier: 1,
      uses: [
        { ability: "fire burst", held: { level: 9, rarity: "common" }, lifeOrDeathHours: 1.2 },
      ],
    })
  ).toHaveProperty("answered.uses.0.atPinnacle", true)
})

test("calibration at Tier 1 turns banked practice into a skill with levels", () => {
  expect(
    settled({
      ...NALA,
      tier: 1,
      calibrating: true,
      uses: [{ ability: "hauling water", banked: 40 }],
    })
  ).toHaveProperty("answered.uses.0", {
    ability: "hauling water",
    points: 0,
    banked: 0,
    level: 6,
    rarity: "common",
    levelsGained: 6,
    atPinnacle: false,
    offered: true,
  })
})

test("at Tier 1 an ability practised enough is offered as a skill", () => {
  expect(
    settled({ ...NALA, tier: 1, uses: [{ ability: "snaring", banked: 8, practiceHours: 4 }] })
  ).toHaveProperty("answered.uses.0.offered", true)
})

test("without a cycling technique a Tier 0 keeps a quarter of a kill's essence", () => {
  expect(settled({ ...NALA, tier: 0, kills: [{ tier: 1 }] })).toHaveProperty(
    "answered.essenceGained",
    2
  )
})

test("with a technique a Tier 0 keeps it all, and half again for a fight for her life", () => {
  expect(
    settled({ ...NALA, cycling: true, tier: 0, kills: [{ tier: 1, lifeOrDeath: true }] })
  ).toHaveProperty("answered.essenceGained", 15)
})

test("a Tier 1 gets half as much from a Tier 1 beast", () => {
  expect(
    settled({ ...NALA, cycling: true, tier: 1, essence: 10, kills: [{ tier: 1 }] })
  ).toHaveProperty("answered.essence", 15)
})

test("Stillwater and shards feed a cycling Tier 0 toward advancing", () => {
  expect(
    settled({ ...NALA, cycling: true, tier: 0, essence: 90, shards: 6, stillwaterDays: 4 })
  ).toHaveProperty("answered", {
    uses: [],
    essenceGained: 10,
    essence: 100,
    stage: "peak",
    readyToAdvance: true,
  })
})

test("sixty of a hundred is the late stage", () => {
  expect(settled({ ...NALA, tier: 0, essence: 60 })).toHaveProperty("answered.stage", "late")
})

test("essence gained is added to her essence page", () => {
  const reading = { ...NALA, cycling: true, tier: 0, kills: [{ tier: 1 }] }
  const answered = settled(reading)
  expect(added(reading, "answered" in answered ? answered.answered : null)).toEqual([
    { page: `${otherwhereXEssence.slug}/${otherwhereXNala.slug}`, key: "value", by: 10 },
  ])
})

test("an unknown rarity is refused", () => {
  expect(
    settled({
      ...NALA,
      tier: 1,
      uses: [{ ability: "focus", held: { level: 1, rarity: "legendary" } }],
    })
  ).toHaveProperty("refused")
})
