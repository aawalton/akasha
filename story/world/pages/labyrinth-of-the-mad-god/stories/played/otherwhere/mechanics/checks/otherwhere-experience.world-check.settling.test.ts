import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere/mechanics/checks/otherwhere-experience.world-check.settling.code.ts"

const WHO = "the castaway"

test("a kill of a level four beast at level nought lifts her to level one", () => {
  expect(
    settled({ character: WHO, level: 0, experience: 0, earned: [{ kind: "kill", level: 4 }] })
  ).toEqual({ answered: { gained: 15, level: 1, experience: 5, levelsGained: 1, toNext: 20 } })
})

test("a beast beneath her level is worth half", () => {
  expect(
    settled({ character: WHO, level: 6, experience: 0, earned: [{ kind: "kill", level: 3 }] })
  ).toHaveProperty("answered.gained", 6)
})

test("a beast five levels beneath her is worth nothing", () => {
  expect(
    settled({ character: WHO, level: 8, experience: 0, earned: [{ kind: "kill", level: 3 }] })
  ).toHaveProperty("answered.gained", 0)
})

test("a kill she only helped with is worth half", () => {
  expect(
    settled({
      character: WHO,
      level: 0,
      experience: 0,
      earned: [{ kind: "kill", level: 7, share: "part" }],
    })
  ).toHaveProperty("answered.gained", 12)
})

test("a quest stage is worth what it states, and may lift several levels", () => {
  expect(
    settled({ character: WHO, level: 1, experience: 0, earned: [{ kind: "quest", worth: 60 }] })
  ).toEqual({ answered: { gained: 60, level: 3, experience: 10, levelsGained: 2, toNext: 40 } })
})

test("experience already past the next level is refused", () => {
  expect(
    settled({ character: WHO, level: 0, experience: 12, earned: [{ kind: "quest", worth: 1 }] })
  ).toHaveProperty("refused")
})

test("nothing earned is refused", () => {
  expect(settled({ character: WHO, level: 0, experience: 0, earned: [] })).toHaveProperty("refused")
})
