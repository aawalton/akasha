import { describe, test } from "bun:test"
import { assertParity, getDef } from "./filter-parity-fixtures"

describe("filter parity: applyFilters ≡ testFilter — selection", () => {
  describe("select", () => {
    const d = [getDef("select")]
    test("equals match", () =>
      assertParity(
        "a",
        { propertyId: "select", operator: "equals", value: "a" },
        d,
        true,
        "select equals"
      ))
    test("equals miss", () =>
      assertParity(
        "a",
        { propertyId: "select", operator: "equals", value: "b" },
        d,
        false,
        "select equals miss"
      ))
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "select", operator: "is_empty" },
        d,
        true,
        "select is_empty"
      ))
  })

  describe("multi-select", () => {
    const d = [getDef("multi-select")]
    test("includes match", () =>
      assertParity(
        ["x", "y"],
        { propertyId: "multi-select", operator: "includes", value: "x" },
        d,
        true,
        "multi-select includes"
      ))
    test("includes miss", () =>
      assertParity(
        ["y"],
        { propertyId: "multi-select", operator: "includes", value: "x" },
        d,
        false,
        "multi-select includes miss"
      ))
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "multi-select", operator: "is_empty" },
        d,
        true,
        "multi-select is_empty"
      ))
  })

  describe("relation", () => {
    const d = [getDef("relation")]
    test("equals match", () =>
      assertParity(
        "page-1",
        { propertyId: "relation", operator: "equals", value: "page-1" },
        d,
        true,
        "relation equals"
      ))
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "relation", operator: "is_empty" },
        d,
        true,
        "relation is_empty"
      ))
  })

  describe("multi-relation", () => {
    const d = [getDef("multi-relation")]
    test("includes match", () =>
      assertParity(
        ["p1", "p2"],
        { propertyId: "multi-relation", operator: "includes", value: "p1" },
        d,
        true,
        "multi-relation includes"
      ))
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "multi-relation", operator: "is_empty" },
        d,
        true,
        "multi-relation is_empty"
      ))
  })
})
