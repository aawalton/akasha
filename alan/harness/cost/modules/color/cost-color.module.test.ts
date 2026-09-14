import { expect, test } from "bun:test"
import { costColorAt } from "akasha/alan/harness/cost/modules/color/cost-color.module.code.ts"

test("a surplus over four hours with a cost of nothing is blue", () => {
  expect(costColorAt(0, 4.5)).toBe("blue")
  expect(costColorAt(0, 20)).toBe("blue")
})

test("a surplus over nothing with a cost of nothing is green", () => {
  expect(costColorAt(0, 0.5)).toBe("green")
  expect(costColorAt(0, 3.9)).toBe("green")
})

test("a surplus over minus four hours with a cost no higher than one multiplier is yellow", () => {
  expect(costColorAt(1, 20)).toBe("yellow")
  expect(costColorAt(0.5, 0)).toBe("yellow")
  expect(costColorAt(1, -3.9)).toBe("yellow")
})

test("a surplus over minus eight hours with a cost no higher than two multipliers is red", () => {
  expect(costColorAt(2, 20)).toBe("red")
  expect(costColorAt(1.5, 0)).toBe("red")
  expect(costColorAt(0, -7.9)).toBe("red")
})

test("a cost no band fits is black", () => {
  expect(costColorAt(2.5, 20)).toBe("black")
  expect(costColorAt(32, 20)).toBe("black")
  expect(costColorAt(0, -20)).toBe("black")
})

test("a cost of nothing is green where a cost of one multiplier is yellow", () => {
  expect(costColorAt(0, 2)).toBe("green")
  expect(costColorAt(1, 2)).toBe("yellow")
})

test("a cost of nothing is blue where a cost above nothing is yellow", () => {
  expect(costColorAt(0, 6)).toBe("blue")
  expect(costColorAt(0.5, 6)).toBe("yellow")
})

test("a cost of nothing under a falling surplus leaves green for yellow and then for red", () => {
  expect(costColorAt(0, 1)).toBe("green")
  expect(costColorAt(0, -1)).toBe("yellow")
  expect(costColorAt(0, -5)).toBe("red")
  expect(costColorAt(0, -9)).toBe("black")
})

test("a band fits a surplus strictly over the hours that band names", () => {
  expect(costColorAt(0, 4)).toBe("green")
  expect(costColorAt(0, 0)).toBe("yellow")
  expect(costColorAt(0, -4)).toBe("red")
  expect(costColorAt(0, -8)).toBe("black")
})

test("a cost of one multiplier is read at each hour a band opens at", () => {
  expect(costColorAt(1, 4)).toBe("yellow")
  expect(costColorAt(1, 0)).toBe("yellow")
  expect(costColorAt(1, -4)).toBe("red")
  expect(costColorAt(1, -8)).toBe("black")
})

test("a cost of two multipliers is read at each hour a band opens at", () => {
  expect(costColorAt(2, 4)).toBe("red")
  expect(costColorAt(2, 0)).toBe("red")
  expect(costColorAt(2, -4)).toBe("red")
  expect(costColorAt(2, -8)).toBe("black")
})

test("a cost just over a band's multiplier drops to the band under it", () => {
  expect(costColorAt(1, 20)).toBe("yellow")
  expect(costColorAt(1.5, 20)).toBe("red")
  expect(costColorAt(2, 20)).toBe("red")
  expect(costColorAt(2.5, 20)).toBe("black")
})

test("a cost between nothing and one multiplier is read by its band rather than rounded", () => {
  expect(costColorAt(0.25, 20)).toBe("yellow")
  expect(costColorAt(0.75, 20)).toBe("yellow")
})

test("a cost nothing was read for is black rather than green", () => {
  expect(costColorAt(null, 20)).toBe("black")
  expect(costColorAt(null, null)).toBe("black")
})

test("a surplus nothing was read for is black rather than a surplus of nothing", () => {
  expect(costColorAt(0, null)).toBe("black")
  expect(costColorAt(0.5, null)).toBe("black")
})
