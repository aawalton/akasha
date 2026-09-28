import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/mana-devourer-litrpgmana-cultivation/stories/played/otherwhere-ix/mechanics/checks/otherwhere-ix-language.world-check.settling.code.ts"

const AT_THE_FIRE = { character: "otherwhere-ix-nala", tongue: "bengai" }

test("an evening of hearing bengai talk and trying a few words adds a little", () => {
  expect(settled({ ...AT_THE_FIRE, fluency: 0, heard: 4, spoken: 1 })).toEqual({
    answered: { gained: 1.5, fluency: 1.5, stage: "none" },
  })
})

test("an hour of teaching adds one", () => {
  expect(settled({ ...AT_THE_FIRE, fluency: 10, taught: 1 })).toHaveProperty("answered.fluency", 11)
})

test("learning slows by half from fifty", () => {
  expect(settled({ ...AT_THE_FIRE, fluency: 60, taught: 4 })).toHaveProperty("answered.fluency", 62)
})

test("a gift for tongues quickens learning", () => {
  expect(settled({ ...AT_THE_FIRE, fluency: 10, taught: 2, quickening: 0.5 })).toHaveProperty(
    "answered.fluency",
    13
  )
})

test("fluency never passes a hundred", () => {
  expect(settled({ ...AT_THE_FIRE, fluency: 99, taught: 10 })).toHaveProperty(
    "answered.fluency",
    100
  )
})

test("twenty is getting by, and eighty fluent", () => {
  expect([
    settled({ ...AT_THE_FIRE, fluency: 20 }),
    settled({ ...AT_THE_FIRE, fluency: 80 }),
  ]).toEqual([
    { answered: { gained: 0, fluency: 20, stage: "getting by" } },
    { answered: { gained: 0, fluency: 80, stage: "fluent" } },
  ])
})

test("a reading naming no tongue is refused", () => {
  expect(settled({ character: "otherwhere-ix-nala", fluency: 0 })).toHaveProperty("refused")
})
