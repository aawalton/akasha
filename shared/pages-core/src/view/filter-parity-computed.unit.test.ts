import { describe, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { assertParity, getDef } from "./filter-parity-fixtures"

describe("filter parity: applyFilters ≡ testFilter — computed", () => {
  describe("rollup", () => {
    const d = [getDef("rollup")]
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "rollup", operator: "is_empty" },
        d,
        true,
        "rollup is_empty"
      ))
    test("is_not_empty on value", () =>
      assertParity(
        "resolved",
        { propertyId: "rollup", operator: "is_not_empty" },
        d,
        true,
        "rollup is_not_empty"
      ))
  })

  describe("aggregate", () => {
    const d = [getDef("aggregate")]
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "aggregate", operator: "is_empty" },
        d,
        true,
        "aggregate is_empty"
      ))
    test("is_not_empty on value", () =>
      assertParity(
        42,
        { propertyId: "aggregate", operator: "is_not_empty" },
        d,
        true,
        "aggregate is_not_empty"
      ))
  })

  describe("formula (number returnType)", () => {
    const d = [getDef("formula")]
    test("equals match", () =>
      assertParity(
        42,
        { propertyId: "formula", operator: "equals", value: 42 },
        d,
        true,
        "formula-number equals"
      ))
    test("gt match", () =>
      assertParity(
        10,
        { propertyId: "formula", operator: "gt", value: 5 },
        d,
        true,
        "formula-number gt"
      ))
  })

  describe("formula (text returnType)", () => {
    const textFormula: PropertyDefinition = {
      id: "formula-text",
      title: "FT",
      type: "formula",
      config: { expression: "'x'", returnType: "text" },
    }
    const d = [textFormula]
    test("contains match", () =>
      assertParity(
        "hello",
        { propertyId: "formula-text", operator: "contains", value: "ell" },
        d,
        true,
        "formula-text contains"
      ))
  })

  describe("formula (boolean returnType)", () => {
    const cbFormula: PropertyDefinition = {
      id: "formula-cb",
      title: "FCB",
      type: "formula",
      config: { expression: "true", returnType: "boolean" },
    }
    const d = [cbFormula]
    test("equals true", () =>
      assertParity(
        true,
        { propertyId: "formula-cb", operator: "equals", value: true },
        d,
        true,
        "formula-boolean true"
      ))
    test("equals false on null", () =>
      assertParity(
        null,
        { propertyId: "formula-cb", operator: "equals", value: false },
        d,
        true,
        "formula-boolean null=false"
      ))
  })

  describe("formula (calendar-date returnType)", () => {
    const dateFormula: PropertyDefinition = {
      id: "formula-date",
      title: "FD",
      type: "formula",
      config: { expression: "today()", returnType: "calendar-date" },
    }
    const d = [dateFormula]
    test("equals match", () =>
      assertParity(
        "2026-01-15",
        { propertyId: "formula-date", operator: "equals", value: "2026-01-15" },
        d,
        true,
        "formula-date equals"
      ))
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "formula-date", operator: "is_empty" },
        d,
        true,
        "formula-date is_empty"
      ))
  })
})
