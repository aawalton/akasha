import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/the-calamitous-bob-stubbed/stories/played/otherwhere-xi/mechanics/checks/otherwhere-xi-language.world-check.settling.code.ts"

const NALA = "her"

test("each day among speakers raises a tongue one, up to plain talk", () => {
  expect(
    settled({ character: NALA, tongues: [{ tongue: "old-imperial", fluency: 0, days: 3 }] })
  ).toEqual({
    answered: {
      learned: [{ tongue: "old-imperial", from: 0, to: 3, daysCarried: 0, speechBand: "hard" }],
    },
  })
})

test("past plain talk a tongue takes a week a step", () => {
  expect(
    settled({ character: NALA, tongues: [{ tongue: "kark", fluency: 6, days: 10 }] })
  ).toHaveProperty("answered.learned.0.to", 7)
})

test("a patient teacher halves the time", () => {
  expect(
    settled({
      character: NALA,
      tongues: [{ tongue: "kark", fluency: 6, days: 7, teacher: true }],
    })
  ).toHaveProperty("answered.learned.0.to", 8)
})

test("a tongue she has no word of cannot carry speech", () => {
  expect(
    settled({ character: NALA, tongues: [{ tongue: "kark", fluency: 0, days: 0 }] })
  ).toHaveProperty("answered.learned.0.speechBand", "impossible")
})

test("no tongue rises past native", () => {
  expect(
    settled({ character: NALA, tongues: [{ tongue: "kark", fluency: 10, days: 30 }] })
  ).toHaveProperty("answered.learned.0.to", 10)
})

test("a reading with no tongue is refused", () => {
  expect(settled({ character: NALA, tongues: [] })).toHaveProperty("refused")
})
