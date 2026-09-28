import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/ends-of-magic/stories/played/otherwhere-v/mechanics/checks/otherwhere-v-language.world-check.settling.code.ts"

test("a day of hearing, speaking and being taught adds up", () => {
  expect(
    settled({
      character: "nala",
      tongue: "elothian",
      fluency: 0,
      heardHours: 6,
      spokenHours: 2,
      taughtHours: 2,
    })
  ).toEqual({ answered: { gained: 4.5, fluency: 4.5, stage: "none" } })
})

test("five points of fluency is a few words", () => {
  expect(
    settled({ character: "nala", tongue: "elothian", fluency: 4.5, taughtHours: 1 })
  ).toHaveProperty("answered.stage", "a few words")
})

test("learning slows by half past fifty", () => {
  expect(
    settled({ character: "nala", tongue: "elothian", fluency: 60, taughtHours: 4 })
  ).toHaveProperty("answered.gained", 2)
})

test("a gift for tongues quickens learning", () => {
  expect(
    settled({ character: "nala", tongue: "elothian", fluency: 10, taughtHours: 2, quickenedBy: 50 })
  ).toHaveProperty("answered.gained", 3)
})

test("fluency never passes a hundred", () => {
  expect(settled({ character: "nala", tongue: "elothian", fluency: 99, taughtHours: 10 })).toEqual({
    answered: { gained: 5, fluency: 100, stage: "fluent" },
  })
})

test("more than a day's hours is refused", () => {
  expect(
    settled({ character: "nala", tongue: "elothian", fluency: 0, heardHours: 30 })
  ).toHaveProperty("refused")
})
