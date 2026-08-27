import { describe, test } from "bun:test"
import { assertParity, getDef } from "./filter-parity-fixtures"

describe("filter parity: applyFilters ≡ testFilter — primitives", () => {
  describe("text", () => {
    const d = [getDef("text")]
    test("contains match", () =>
      assertParity(
        "Hello World",
        { propertyId: "text", operator: "contains", value: "hello" },
        d,
        true,
        "text contains"
      ))
    test("contains miss", () =>
      assertParity(
        "foo",
        { propertyId: "text", operator: "contains", value: "bar" },
        d,
        false,
        "text contains miss"
      ))
    test("is_empty on null", () =>
      assertParity(null, { propertyId: "text", operator: "is_empty" }, d, true, "text is_empty"))
  })

  describe("markdown", () => {
    const d = [getDef("markdown")]
    test("contains match", () =>
      assertParity(
        "# Title",
        { propertyId: "markdown", operator: "contains", value: "title" },
        d,
        true,
        "markdown contains"
      ))
    test("is_not_empty", () =>
      assertParity(
        "content",
        { propertyId: "markdown", operator: "is_not_empty" },
        d,
        true,
        "markdown is_not_empty"
      ))
  })

  describe("number", () => {
    const d = [getDef("number")]
    test("equals match", () =>
      assertParity(
        42,
        { propertyId: "number", operator: "equals", value: 42 },
        d,
        true,
        "number equals"
      ))
    test("gt match", () =>
      assertParity(10, { propertyId: "number", operator: "gt", value: 5 }, d, true, "number gt"))
    test("gt miss", () =>
      assertParity(
        3,
        { propertyId: "number", operator: "gt", value: 5 },
        d,
        false,
        "number gt miss"
      ))
  })

  describe("boolean", () => {
    const d = [getDef("boolean")]
    test("equals true", () =>
      assertParity(
        true,
        { propertyId: "boolean", operator: "equals", value: true },
        d,
        true,
        "boolean true"
      ))
    test("equals false on null", () =>
      assertParity(
        null,
        { propertyId: "boolean", operator: "equals", value: false },
        d,
        true,
        "boolean null=false"
      ))
    test("not_equals true on false", () =>
      assertParity(
        false,
        { propertyId: "boolean", operator: "not_equals", value: true },
        d,
        true,
        "boolean not_equals"
      ))
  })

  describe("url", () => {
    const d = [getDef("url")]
    test("contains match", () =>
      assertParity(
        "https://example.com",
        { propertyId: "url", operator: "contains", value: "example" },
        d,
        true,
        "url contains"
      ))
    test("is_empty on null", () =>
      assertParity(null, { propertyId: "url", operator: "is_empty" }, d, true, "url is_empty"))
  })

  describe("json", () => {
    const d = [getDef("json")]
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "json", operator: "is_empty" },
        d,
        true,
        "json is_empty null"
      ))
    test("is_not_empty on object", () =>
      assertParity(
        { a: 1 },
        { propertyId: "json", operator: "is_not_empty" },
        d,
        true,
        "json is_not_empty"
      ))
  })

  describe("calendar-date", () => {
    const d = [getDef("calendar-date")]
    test("equals match", () =>
      assertParity(
        "2026-01-15",
        { propertyId: "calendar-date", operator: "equals", value: "2026-01-15" },
        d,
        true,
        "date equals"
      ))
    test("gt match", () =>
      assertParity(
        "2026-06-01",
        { propertyId: "calendar-date", operator: "gt", value: "2026-01-01" },
        d,
        true,
        "date gt"
      ))
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "calendar-date", operator: "is_empty" },
        d,
        true,
        "date is_empty"
      ))
  })

  describe("instant", () => {
    const d = [getDef("instant")]
    test("gte match", () =>
      assertParity(
        1_700_000_000_000,
        { propertyId: "instant", operator: "gte", value: 1_700_000_000_000 },
        d,
        true,
        "instant gte"
      ))
    test("is_empty on null", () =>
      assertParity(
        null,
        { propertyId: "instant", operator: "is_empty" },
        d,
        true,
        "instant is_empty"
      ))
  })
})
