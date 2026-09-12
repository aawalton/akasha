import { expect, test } from "bun:test"
import { leftIn } from "akasha/alan/values/health/fitness/strength/exercises/selection/constraints/pages/bilateral-hinge/bilateral-hinge.strength-exercise-selection-constraint.code.ts"

test("a hinge on both legs is kept out", () => {
  expect(leftIn({ movementPattern: "hinge", laterality: "bilateral" })).toBe(false)
})

test("a hinge on one leg is left in", () => {
  expect(leftIn({ movementPattern: "hinge", laterality: "unilateral" })).toBe(true)
  expect(leftIn({ movementPattern: "hinge", laterality: "alternating" })).toBe(true)
})

test("a movement that is no hinge is left in", () => {
  expect(leftIn({ movementPattern: "squat", laterality: "bilateral" })).toBe(true)
  expect(leftIn({ movementPattern: "h-pull", laterality: "bilateral" })).toBe(true)
})
