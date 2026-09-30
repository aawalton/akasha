import { expect, test } from "bun:test"
import { overwhereIiiNala } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/characters/overwhere-iii-nala.character-player.ts"
import { settled } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/checks/overwhere-iii-growth.world-check.settling.code.ts"
import { overwhereIiiManaWeaver } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/traits/pages/overwhere-iii-mana-weaver.overwhere-iii-trait.ts"

const NALA = `character-player/${overwhereIiiNala.slug}`

const PER_RANK = overwhereIiiManaWeaver.rankUses ?? 1

const TOP = overwhereIiiManaWeaver.ranks.length

const FRESH = { character: NALA, level: 1, experience: 0, rank: 1, uses: 0 }

test("a Level 12 foe lifts a Level 1 Nala to Level 2", () => {
  expect(settled({ ...FRESH, foes: [{ level: 12 }] })).toHaveProperty("answered", {
    gained: 120,
    experience: 20,
    level: 2,
    levelsGained: 1,
    rank: 1,
    uses: 0,
    ranked: false,
    fullPotential: false,
  })
})

test("a foe five levels under her gives two per level", () => {
  expect(settled({ ...FRESH, level: 10, foes: [{ level: 5 }] })).toHaveProperty(
    "answered.gained",
    10
  )
})

test("an assisted defeat gives half", () => {
  expect(settled({ ...FRESH, foes: [{ level: 4, assisted: true }] })).toHaveProperty(
    "answered.gained",
    20
  )
})

test("a deed gives twenty times her level", () => {
  expect(settled({ ...FRESH, level: 3, deeds: 1 })).toHaveProperty("answered.gained", 60)
})

test("a deed after a foe lifts her gives twenty times the level the foe lifted her to", () => {
  expect(settled({ ...FRESH, foes: [{ level: 12 }], deeds: 1 })).toHaveProperty("answered", {
    gained: 160,
    experience: 60,
    level: 2,
    levelsGained: 1,
    rank: 1,
    uses: 0,
    ranked: false,
    fullPotential: false,
  })
})

test("a foe after a level gained is weighed against the level she reached", () => {
  expect(
    settled({ ...FRESH, level: 9, experience: 880, foes: [{ level: 5 }, { level: 5 }] })
  ).toHaveProperty("answered", {
    gained: 60,
    experience: 40,
    level: 10,
    levelsGained: 1,
    rank: 1,
    uses: 0,
    ranked: false,
    fullPotential: false,
  })
})

test("enough telling uses raise the trait a rank", () => {
  expect(settled({ ...FRESH, telling: PER_RANK })).toHaveProperty("answered.rank", 2)
})

test("the top rank with its uses full is full potential", () => {
  expect(settled({ ...FRESH, rank: TOP, uses: PER_RANK * TOP - 1, telling: 1 })).toHaveProperty(
    "answered.fullPotential",
    true
  )
})

test("a reading naming no character is refused", () => {
  expect(settled({ ...FRESH, character: " " })).toHaveProperty("refused")
})

test("a rank past the trait's top is refused", () => {
  expect(settled({ ...FRESH, rank: TOP + 1 })).toHaveProperty("refused")
})
