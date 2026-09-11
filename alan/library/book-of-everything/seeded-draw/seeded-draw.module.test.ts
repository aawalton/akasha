import { expect, test } from "bun:test"
import { drawsFromSeed } from "akasha/alan/library/book-of-everything/seeded-draw/seeded-draw.module.code.ts"

const BOUND = 100

const RUN = 50

function runOf(seed: number, bound = BOUND): readonly number[] {
  const draw = drawsFromSeed(seed)
  return Array.from({ length: RUN }, () => draw(bound))
}

test("one seed gives one run of draws, however many times that seed is asked", () => {
  expect(runOf(12345)).toEqual(runOf(12345))
  expect(runOf(0)).toEqual(runOf(0))
  expect(runOf(-7)).toEqual(runOf(-7))
})

test("two seeds that differ give runs that differ", () => {
  expect(runOf(12345)).not.toEqual(runOf(12346))
  expect(runOf(0)).not.toEqual(runOf(1))
})

test("a draw is from nought up to but not including the bound asked for", () => {
  const draw = drawsFromSeed(987654321)
  for (const bound of [1, 2, 3, 7, 64, 1000]) {
    for (let i = 0; i < 500; i++) {
      const one = draw(bound)
      expect(Number.isInteger(one)).toBe(true)
      expect(one).toBeGreaterThanOrEqual(0)
      expect(one).toBeLessThan(bound)
    }
  }
})

test("a bound of one is always nought", () => {
  const draw = drawsFromSeed(42)
  expect(Array.from({ length: 20 }, () => draw(1))).toEqual(Array.from({ length: 20 }, () => 0))
})

test("a bound below one is refused rather than answered", () => {
  const draw = drawsFromSeed(42)
  expect(() => draw(0)).toThrow("bound must be a whole number of one or more")
  expect(() => draw(-3)).toThrow("bound must be a whole number of one or more")
  expect(() => draw(2.5)).toThrow("bound must be a whole number of one or more")
})
