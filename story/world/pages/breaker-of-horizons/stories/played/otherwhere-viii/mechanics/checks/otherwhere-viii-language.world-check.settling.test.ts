import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/breaker-of-horizons/stories/played/otherwhere-viii/mechanics/checks/otherwhere-viii-language.world-check.settling.code.ts"

test("a day of hearing, speaking and being taught Sedhahn adds up", () => {
  expect(
    settled({
      character: "nala",
      tongue: "sedhahn",
      fluency: 0,
      heardHours: 6,
      spokenHours: 2,
      taughtHours: 2,
    })
  ).toEqual({ answered: { gained: 4.5, fluency: 4.5, stage: "none" } })
})

test("five points of fluency is a few words", () => {
  expect(
    settled({ character: "nala", tongue: "sedhahn", fluency: 4.5, taughtHours: 1 })
  ).toHaveProperty("answered.stage", "a few words")
})

test("learning slows by half past fifty", () => {
  expect(
    settled({ character: "nala", tongue: "elven", fluency: 60, taughtHours: 4 })
  ).toHaveProperty("answered.gained", 2)
})

test("the common tongue she speaks as a native stays fluent at a hundred", () => {
  expect(settled({ character: "nala", tongue: "common", fluency: 100, spokenHours: 8 })).toEqual({
    answered: { gained: 2, fluency: 100, stage: "fluent" },
  })
})

test("more than a day's hours is refused", () => {
  expect(
    settled({ character: "nala", tongue: "sedhahn", fluency: 0, heardHours: 30 })
  ).toHaveProperty("refused")
})

test("a reading naming no tongue is refused", () => {
  expect(settled({ character: "nala", tongue: "", fluency: 0 })).toHaveProperty("refused")
})
