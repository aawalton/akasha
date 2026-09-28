import { expect, test } from "bun:test"
import { readingBy } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { settled } from "akasha/story/world/pages/labyrinth-of-the-mad-god/stories/played/otherwhere-ii/mechanics/checks/otherwhere-action-check.world-check.settling.code.ts"

const oneD20 = readingBy(1, 20)

function faced(face: number) {
  const read = oneD20({ faces: [face] })
  if ("refused" in read) throw new Error(read.refused)
  return read.answered
}

test("a human attribute of six adds nothing", () => {
  expect(settled({ band: "easy", attribute: 6 }, faced(8))).toHaveProperty("answered.total", 8)
})

test("an attribute adds half its lead over six, rounded down", () => {
  expect(settled({ band: "easy", attribute: 11 }, faced(8))).toHaveProperty("answered.total", 10)
})

test("a weak attribute takes from the roll", () => {
  expect(settled({ band: "easy", attribute: 3 }, faced(8))).toHaveProperty("answered.total", 6)
})

test("an attribute adds at most four", () => {
  expect(settled({ band: "easy", attribute: 40 }, faced(8))).toHaveProperty("answered.total", 12)
})

test("a skill adds one for every five levels", () => {
  expect(settled({ band: "easy", skill: 14 }, faced(8))).toHaveProperty("answered.total", 10)
})

test("attribute and skill sit outside the cap on named bonuses", () => {
  const reading = {
    band: "hard",
    attribute: 14,
    skill: 20,
    bonuses: [
      { from: "spear", by: 3 },
      { from: "high ground", by: 3 },
    ],
  }
  expect(settled(reading, faced(2))).toMatchObject({
    answered: { outcome: "success", total: 16, margin: 0 },
  })
})

test("a natural one fails however strong the attribute", () => {
  expect(settled({ band: "easy", attribute: 20 }, faced(1))).toHaveProperty(
    "answered.outcome",
    "failure"
  )
})

test("a natural twenty comes off strongly however weak the attribute", () => {
  expect(settled({ band: "extreme", attribute: 0 }, faced(20))).toHaveProperty(
    "answered.outcome",
    "strong"
  )
})

test("an attribute that is no whole number is refused", () => {
  expect(settled({ band: "easy", attribute: 6.5 }, faced(10))).toHaveProperty("refused")
})

test("a band the game does not have is refused", () => {
  expect(settled({ band: "trivial", attribute: 6 }, faced(10))).toHaveProperty("refused")
})
