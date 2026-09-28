import { expect, test } from "bun:test"
import { readingBy } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { settled } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/checks/otherwhere-harm.world-check.settling.code.ts"

const oneD6 = readingBy(1, 6)

function faced(face: number) {
  const read = oneD6({ faces: [face] })
  if ("refused" in read) throw new Error(read.refused)
  return read.answered
}

test("a solid blow deals the die and two", () => {
  expect(settled({ force: "solid", landed: "success" }, faced(4))).toEqual({
    answered: { harm: 6 },
  })
})

test("a savage bite deals the die and seven", () => {
  expect(settled({ force: "savage", landed: "success" }, faced(3))).toEqual({
    answered: { harm: 10 },
  })
})

test("a blow landed strongly deals three more", () => {
  expect(settled({ force: "light", landed: "strong" }, faced(2))).toEqual({
    answered: { harm: 5 },
  })
})

test("a blow landed at a cost deals half, rounded up", () => {
  expect(settled({ force: "heavy", landed: "cost" }, faced(3))).toEqual({
    answered: { harm: 4 },
  })
})

test("a ward takes from the harm", () => {
  expect(settled({ force: "crushing", landed: "success", ward: 4 }, faced(5))).toEqual({
    answered: { harm: 11 },
  })
})

test("toughness past the human mark shrugs off one for every three", () => {
  expect(settled({ force: "heavy", landed: "success", toughness: 13 }, faced(4))).toEqual({
    answered: { harm: 6 },
  })
})

test("toughness at or under the human mark shrugs off nothing", () => {
  expect(settled({ force: "heavy", landed: "success", toughness: 4 }, faced(4))).toEqual({
    answered: { harm: 8 },
  })
})

test("a blow that lands deals at least one", () => {
  expect(settled({ force: "light", landed: "cost", ward: 8 }, faced(1))).toEqual({
    answered: { harm: 1 },
  })
})

test("a blow that failed is no blow and is refused", () => {
  expect(settled({ force: "solid", landed: "failure" }, faced(4))).toHaveProperty("refused")
})

test("a ward past eight is refused", () => {
  expect(settled({ force: "solid", landed: "success", ward: 9 }, faced(4))).toHaveProperty(
    "refused"
  )
})
