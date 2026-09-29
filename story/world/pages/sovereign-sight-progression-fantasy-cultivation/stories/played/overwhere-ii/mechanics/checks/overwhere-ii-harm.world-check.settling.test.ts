import { expect, test } from "bun:test"
import { settled } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/checks/overwhere-ii-harm.world-check.settling.code.ts"

test("a solid blow on an ordinary body deals the die and its force", () => {
  expect(
    settled(
      { force: "solid", landed: "success", vigour: 10 },
      { total: 4, crit: false, fumble: false }
    )
  ).toEqual({
    answered: { harm: 6, vigour: 4, downed: false },
  })
})

test("Nala's Might and her refined skin shrug off most of a blow", () => {
  const reading = { force: "solid", landed: "success", ward: 2, might: 14, vigour: 30 }
  expect(settled(reading, { total: 4, crit: false, fumble: false })).toHaveProperty(
    "answered.harm",
    2
  )
})

test("a blow that lands at a cost deals half, rounded up", () => {
  expect(
    settled(
      { force: "heavy", landed: "cost", vigour: 20 },
      { total: 3, crit: false, fumble: false }
    )
  ).toHaveProperty("answered.harm", 4)
})

test("every blow that lands deals at least one", () => {
  const reading = { force: "light", landed: "success", ward: 8, might: 40, vigour: 30 }
  expect(settled(reading, { total: 1, crit: false, fumble: true })).toHaveProperty(
    "answered.harm",
    1
  )
})

test("an ordinary blow leaves her downed but alive at one", () => {
  expect(
    settled(
      { force: "crushing", landed: "strong", vigour: 5 },
      { total: 6, crit: true, fumble: false }
    )
  ).toEqual({
    answered: { harm: 19, vigour: 1, downed: true },
  })
})

test("only a deadly foe's blow can take her to nothing", () => {
  const reading = { force: "crushing", landed: "strong", vigour: 5, deadly: true }
  expect(settled(reading, { total: 6, crit: true, fumble: false })).toEqual({
    answered: { harm: 19, vigour: 0, downed: true },
  })
})

test("a force the game does not have is refused", () => {
  expect(
    settled(
      { force: "vast", landed: "success", vigour: 5 },
      { total: 3, crit: false, fumble: false }
    )
  ).toHaveProperty("refused")
})

test("a blow with no vigour to strike is refused", () => {
  expect(
    settled({ force: "solid", landed: "success" }, { total: 3, crit: false, fumble: false })
  ).toHaveProperty("refused")
})
