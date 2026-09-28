import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/ends-of-magic/stories/played/otherwhere-v/mechanics/checks/otherwhere-v-growth.world-check.settling.code.ts"

const NALA = "nala"

test("a real challenge under Disadvantage gives two levels", () => {
  expect(
    settled({ character: NALA, challenge: "real", disadvantaged: true, level: 1, hasClass: false })
  ).toHaveProperty("answered.level", 3)
})

test("a minor challenge gives no level", () => {
  expect(
    settled({ character: NALA, challenge: "minor", disadvantaged: true, level: 3, hasClass: false })
  ).toHaveProperty("answered.levelsGained", 0)
})

test("past level nine with no class the level shows as nine and more, and a class is due", () => {
  expect(
    settled({
      character: NALA,
      challenge: "deadly",
      disadvantaged: true,
      level: 3,
      hasClass: false,
    })
  ).toEqual({
    answered: {
      levelsGained: 12,
      level: 15,
      shown: "9+",
      classDue: true,
      classDevelops: false,
      ranks: [],
    },
  })
})

test("levels come slower past twenty-seven", () => {
  expect(
    settled({ character: NALA, challenge: "dire", disadvantaged: false, level: 30, hasClass: true })
  ).toHaveProperty("answered.levelsGained", 1)
})

test("a class crossing twenty-seven develops", () => {
  expect(
    settled({ character: NALA, challenge: "dire", disadvantaged: true, level: 25, hasClass: true })
  ).toHaveProperty("answered.classDevelops", true)
})

test("a skill used well gains ranks, one more under Disadvantage", () => {
  expect(
    settled({
      character: NALA,
      challenge: "real",
      disadvantaged: true,
      level: 1,
      hasClass: false,
      uses: [{ name: "Focused Mind", rank: 2, used: "strong" }],
    })
  ).toHaveProperty("answered.ranks", [
    { name: "Focused Mind", from: 2, to: 5, awaitingInsight: false, developed: false },
  ])
})

test("a rank reaching ten without Insight waits there", () => {
  expect(
    settled({
      character: NALA,
      challenge: "dire",
      disadvantaged: true,
      level: 5,
      hasClass: false,
      uses: [{ name: "Magic Resistance", rank: 9, used: "success" }],
    })
  ).toHaveProperty("answered.ranks", [
    { name: "Magic Resistance", from: 9, to: 10, awaitingInsight: true, developed: false },
  ])
})

test("a rank reaching ten with Insight develops and starts again at one", () => {
  expect(
    settled({
      character: NALA,
      challenge: "real",
      disadvantaged: false,
      level: 5,
      hasClass: false,
      uses: [{ name: "Parkour", rank: 10, used: "success", insightHeld: true }],
    })
  ).toHaveProperty("answered.ranks", [
    { name: "Parkour", from: 10, to: 1, awaitingInsight: false, developed: true },
  ])
})

test("a challenge the world does not have is refused", () => {
  expect(
    settled({ character: NALA, challenge: "epic", disadvantaged: true, level: 1, hasClass: false })
  ).toHaveProperty("refused")
})
