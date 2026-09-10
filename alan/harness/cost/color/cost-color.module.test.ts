import { expect, test } from "bun:test"
import { costColorAt } from "./cost-color.module.code.ts"

test("a cost of nothing is green whatever the surplus is", () => {
  expect(costColorAt(0, "blue")).toBe("green")
  expect(costColorAt(0, "green")).toBe("green")
  expect(costColorAt(0, "black")).toBe("green")
  expect(costColorAt(0, null)).toBe("green")
})

test("a cost above one is black whatever the surplus is", () => {
  expect(costColorAt(1.5, "blue")).toBe("black")
  expect(costColorAt(2, "green")).toBe("black")
  expect(costColorAt(32, "blue")).toBe("black")
})

test("a cost of one or less is yellow where the surplus is blue", () => {
  expect(costColorAt(1, "blue")).toBe("yellow")
  expect(costColorAt(0.5, "blue")).toBe("yellow")
})

test("a cost of one or less is red where the surplus is green", () => {
  expect(costColorAt(1, "green")).toBe("red")
  expect(costColorAt(0.5, "green")).toBe("red")
})

test("a cost of one or less is black where the surplus is beneath green", () => {
  expect(costColorAt(1, "yellow")).toBe("black")
  expect(costColorAt(1, "red")).toBe("black")
  expect(costColorAt(0.5, "black")).toBe("black")
  expect(costColorAt(0.5, null)).toBe("black")
})

test("a cost nothing was read for is black rather than green", () => {
  expect(costColorAt(null, "blue")).toBe("black")
  expect(costColorAt(null, null)).toBe("black")
})

test("a cost is never drawn blue", () => {
  const costs = [null, 0, 0.5, 1, 1.5, 2, 32]
  const surpluses = ["black", "red", "yellow", "green", "blue", null] as const
  for (const cost of costs) {
    for (const surplus of surpluses) {
      expect(costColorAt(cost, surplus)).not.toBe("blue")
    }
  }
})
