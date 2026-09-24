import { expect, test } from "bun:test"
import { readingBy } from "akasha/story/game/game-mechanic/modules/dice-reading/dice-reading.module.code.ts"

const TWO_D_TEN = readingBy(2, 10)

test("the total is what the faces came to", () => {
  expect(TWO_D_TEN({ faces: [4, 5] })).toEqual({
    answered: { total: 9, crit: false, fumble: false },
  })
})

test("the best a handful can come to is a critical", () => {
  expect(TWO_D_TEN({ faces: [10, 10] })).toEqual({
    answered: { total: 20, crit: true, fumble: false },
  })
})

test("the worst a handful can come to is a fumble", () => {
  expect(TWO_D_TEN({ faces: [1, 1] })).toEqual({
    answered: { total: 2, crit: false, fumble: true },
  })
})

test("a handful holding the wrong number of dice is refused", () => {
  expect(TWO_D_TEN({ faces: [4] })).toHaveProperty("refused")
  expect(TWO_D_TEN({ faces: [4, 5, 6] })).toHaveProperty("refused")
})

test("a face a die of those sides cannot show is refused", () => {
  expect(TWO_D_TEN({ faces: [0, 5] })).toHaveProperty("refused")
  expect(TWO_D_TEN({ faces: [11, 5] })).toHaveProperty("refused")
  expect(TWO_D_TEN({ faces: [4.5, 5] })).toHaveProperty("refused")
})

test("one die of twenty sides is its own handful", () => {
  expect(readingBy(1, 20)({ faces: [20] })).toEqual({
    answered: { total: 20, crit: true, fumble: false },
  })
})
