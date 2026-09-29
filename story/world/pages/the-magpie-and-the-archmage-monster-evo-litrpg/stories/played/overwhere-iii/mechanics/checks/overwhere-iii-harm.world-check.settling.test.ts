import { expect, test } from "bun:test"
import { overwhereIiiNala } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/characters/overwhere-iii-nala.character-player.ts"
import { settled } from "akasha/story/world/pages/the-magpie-and-the-archmage-monster-evo-litrpg/stories/played/overwhere-iii/mechanics/checks/overwhere-iii-harm.world-check.settling.code.ts"

const NALA = `character-player/${overwhereIiiNala.slug}`

const BOAR = "a corrupted boar"

const ONE = { total: 1, crit: false, fumble: true }

const THREE = { total: 3, crit: false, fumble: false }

const FOUR = { total: 4, crit: false, fumble: false }

const SIX = { total: 6, crit: true, fumble: false }

test("a solid blow deals the die plus two", () => {
  expect(settled({ target: BOAR, health: 30, force: "solid", landed: "success" }, FOUR)).toEqual({
    answered: { harm: 6, left: 24, spent: false, down: false },
  })
})

test("a crushing working lands hard on a beast and downs it", () => {
  expect(settled({ target: BOAR, health: 12, force: "crushing", landed: "strong" }, THREE)).toEqual(
    { answered: { harm: 16, left: 0, spent: false, down: true } }
  )
})

test("a blow landed at a cost deals half, rounded down", () => {
  expect(
    settled({ target: BOAR, health: 20, force: "heavy", landed: "cost" }, FOUR)
  ).toHaveProperty("answered.harm", 4)
})

test("a ward takes from the harm, but a landed blow deals at least one", () => {
  expect(
    settled({ target: BOAR, health: 20, force: "light", landed: "cost", ward: 8 }, ONE)
  ).toHaveProperty("answered.harm", 1)
})

test("an ordinary blow never takes Nala below one", () => {
  expect(settled({ target: NALA, health: 5, force: "crushing", landed: "strong" }, SIX)).toEqual({
    answered: { harm: 19, left: 1, spent: true, down: false },
  })
})

test("a foe far beyond her can take Nala to nought", () => {
  expect(
    settled({ target: NALA, health: 5, force: "crushing", landed: "strong", beyond: true }, SIX)
  ).toEqual({ answered: { harm: 19, left: 0, spent: false, down: true } })
})

test("a light blow on a hale Nala leaves her unspent", () => {
  expect(settled({ target: NALA, health: 30, force: "light", landed: "success" }, THREE)).toEqual({
    answered: { harm: 3, left: 27, spent: false, down: false },
  })
})

test("a blow that failed is no blow and is refused", () => {
  expect(
    settled({ target: BOAR, health: 10, force: "solid", landed: "failure" }, FOUR)
  ).toHaveProperty("refused")
})

test("a ward past eight is refused", () => {
  expect(
    settled({ target: BOAR, health: 10, force: "solid", landed: "success", ward: 9 }, FOUR)
  ).toHaveProperty("refused")
})
