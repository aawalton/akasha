import { expect, test } from "bun:test"
import { runMechanic } from "akasha/story/game/game-mechanic/pages/skill-advance/skill-advance.game-mechanic.code.ts"

const EMBER = { rank: "apprentice", level: 9, demos: 0, shown: "journeyman" }

test("ember channel holds one short of promotion until both demonstrations land", () => {
  expect(runMechanic(EMBER)).toEqual({
    answered: { rank: "apprentice", level: 9, demos: 1, gained: 0, promoted: false },
  })
})

test("the second qualifying demonstration lifts the clamp and promotes", () => {
  expect(runMechanic({ ...EMBER, demos: 1 })).toEqual({
    answered: { rank: "journeyman", level: 1, demos: 0, gained: 1, promoted: true },
  })
})

test("a use rolls the level halfway to the rung's width", () => {
  expect(runMechanic({ rank: "novice", level: 1, demos: 0, shown: "novice" })).toEqual({
    answered: { rank: "novice", level: 3, demos: 0, gained: 2, promoted: false },
  })
})

test("a use below the rung the skill holds advances nothing", () => {
  expect(runMechanic({ rank: "expert", level: 10, demos: 2, shown: "apprentice" })).toEqual({
    answered: { rank: "expert", level: 10, demos: 2, gained: 0, promoted: false },
  })
})

test("crossing into apprentice takes one demonstration, and crossing into master four", () => {
  expect(runMechanic({ rank: "novice", level: 4, demos: 0, shown: "apprentice" })).toEqual({
    answered: { rank: "apprentice", level: 1, demos: 0, gained: 1, promoted: true },
  })
  expect(runMechanic({ rank: "expert", level: 49, demos: 0, shown: "master" })).toEqual({
    answered: { rank: "expert", level: 49, demos: 1, gained: 0, promoted: false },
  })
})

test("a sage's level rises by one a use", () => {
  expect(runMechanic({ rank: "sage", level: 12, demos: 0, shown: "sage" })).toEqual({
    answered: { rank: "sage", level: 13, demos: 0, gained: 1, promoted: false },
  })
})

test("a rung no skill climbs is refused", () => {
  expect(runMechanic({ ...EMBER, rank: "kindled" })).toHaveProperty("refused")
  expect(runMechanic({ ...EMBER, shown: "kindled" })).toHaveProperty("refused")
})
