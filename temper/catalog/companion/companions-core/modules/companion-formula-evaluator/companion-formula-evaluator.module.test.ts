import { expect, test } from "bun:test"
import { evaluateFormula } from "akasha/temper/catalog/companion/companions-core/modules/companion-formula-evaluator/companion-formula-evaluator.module.code.ts"

test("a metric reference missing from the value map is refused, naming both metrics", () => {
  expect(() =>
    evaluateFormula(
      "companion-dps-total",
      { type: "metric-ref", metricId: "companion-dps-direct" },
      new Map(),
      []
    )
  ).toThrow(
    "Companion formula for companion-dps-total names companion-dps-direct, which has no value"
  )
})

test("a role operand missing from the value map is refused, naming both metrics", () => {
  expect(() =>
    evaluateFormula(
      "companion-score",
      { type: "role-sum", operands: [{ role: "dps", metricRef: "companion-dps-total" }] },
      new Map(),
      [],
      ["dps"]
    )
  ).toThrow("Companion formula for companion-score names companion-dps-total, which has no value")
})

test("a role operand for a role the build lacks is not read", () => {
  expect(
    evaluateFormula(
      "companion-score",
      { type: "role-sum", operands: [{ role: "dps", metricRef: "companion-dps-total" }] },
      new Map(),
      [],
      ["tank"]
    )
  ).toBe(0)
})

test("a metric reference present in the value map reads its value", () => {
  expect(
    evaluateFormula(
      "companion-dps-total",
      { type: "metric-ref", metricId: "companion-dps-direct" },
      new Map([["companion-dps-direct", 12]]),
      []
    )
  ).toBe(12)
})
