import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { urlOps } from "./url"

const def: PropertyDefinition = { id: "u", title: "URL", type: "url" }

describe("urlOps", () => {
  test("validate accepts valid URLs and empty", () => {
    expect(urlOps.validate("https://example.com", def)).toBeNull()
    expect(urlOps.validate("", def)).toBeNull()
    expect(urlOps.validate(null, def)).toBeNull()
  })

  test("validate rejects malformed URLs", () => {
    expect(urlOps.validate("not a url", def)).toBe("Invalid URL")
  })

  test("getSortValue returns hostname to match render", () => {
    expect(urlOps.getSortValue("https://example.com/path?q=1")).toBe("example.com")
    expect(urlOps.getSortValue("https://sub.example.com")).toBe("sub.example.com")
    expect(urlOps.getSortValue(null)).toBeNull()
    expect(urlOps.getSortValue("")).toBeNull()
  })

  test("getSortValue falls back to raw string on parse failure", () => {
    expect(urlOps.getSortValue("not a url")).toBe("not a url")
  })

  test("getFilterOperators returns 6 text operators", () => {
    expect(urlOps.getFilterOperators(def)).toEqual([
      { value: "contains", label: "Contains" },
      { value: "not_contains", label: "Does not contain" },
      { value: "equals", label: "Equals" },
      { value: "not_equals", label: "Does not equal" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })

  test("getFilterPredicate contains/equals/empty", () => {
    expect(
      urlOps.getFilterPredicate(
        { operator: "contains", value: "example" },
        def
      )("https://example.com")
    ).toBe(true)
    expect(
      urlOps.getFilterPredicate({ operator: "equals", value: "https://foo" }, def)("https://foo")
    ).toBe(true)
    expect(urlOps.getFilterPredicate({ operator: "is_empty", value: "" }, def)("")).toBe(true)
    expect(urlOps.getFilterPredicate({ operator: "is_not_empty", value: "" }, def)("x")).toBe(true)
  })
})

describe("urlOps edge cases", () => {
  test("validate accepts various protocols", () => {
    expect(urlOps.validate("http://example.com", def)).toBeNull()
    expect(urlOps.validate("https://example.com", def)).toBeNull()
    expect(urlOps.validate("ftp://example.com", def)).toBeNull()
    expect(urlOps.validate("mailto:user@example.com", def)).toBeNull()
    expect(urlOps.validate("file:///tmp/x", def)).toBeNull()
  })

  test("validate rejects bare words and whitespace-only", () => {
    expect(urlOps.validate("example.com", def)).toBe("Invalid URL")
    expect(urlOps.validate("   ", def)).toBe("Invalid URL")
  })

  test("validate treats undefined as empty (null)", () => {
    expect(urlOps.validate(undefined, def)).toBeNull()
  })

  test("getSortValue strips protocol/path/query/fragment to hostname", () => {
    expect(urlOps.getSortValue("https://example.com/")).toBe("example.com")
    expect(urlOps.getSortValue("https://example.com/a/b/c")).toBe("example.com")
    expect(urlOps.getSortValue("https://example.com?q=1&r=2")).toBe("example.com")
    expect(urlOps.getSortValue("https://example.com#section")).toBe("example.com")
    expect(urlOps.getSortValue("http://example.com:8080/x")).toBe("example.com")
  })

  test("getSortValue handles subdomains and internationalized hosts", () => {
    expect(urlOps.getSortValue("https://a.b.example.com")).toBe("a.b.example.com")
  })

  test("getSortValue returns null for null/undefined/empty", () => {
    expect(urlOps.getSortValue(null)).toBeNull()
    expect(urlOps.getSortValue(undefined)).toBeNull()
    expect(urlOps.getSortValue("")).toBeNull()
  })

  test("getSortValue falls back to raw string for malformed", () => {
    expect(urlOps.getSortValue("definitely not a url")).toBe("definitely not a url")
  })

  test("getFilterPredicate is case-insensitive", () => {
    expect(
      urlOps.getFilterPredicate(
        { operator: "contains", value: "EXAMPLE" },
        def
      )("https://example.com")
    ).toBe(true)
    expect(
      urlOps.getFilterPredicate(
        { operator: "equals", value: "HTTPS://EXAMPLE.COM" },
        def
      )("https://example.com")
    ).toBe(true)
  })

  test("getFilterPredicate treats null/undefined value as empty string", () => {
    expect(urlOps.getFilterPredicate({ operator: "is_empty", value: "" }, def)(null)).toBe(true)
    expect(urlOps.getFilterPredicate({ operator: "is_empty", value: "" }, def)(undefined)).toBe(
      true
    )
    expect(urlOps.getFilterPredicate({ operator: "contains", value: "x" }, def)(null)).toBe(false)
  })

  test("getFilterPredicate not_contains and not_equals", () => {
    expect(
      urlOps.getFilterPredicate(
        { operator: "not_contains", value: "zzz" },
        def
      )("https://example.com")
    ).toBe(true)
    expect(
      urlOps.getFilterPredicate(
        { operator: "not_equals", value: "https://foo" },
        def
      )("https://example.com")
    ).toBe(true)
  })

  test("getFilterPredicate unknown operator defaults to true", () => {
    expect(
      urlOps.getFilterPredicate({ operator: "gt", value: "" }, def)("https://example.com")
    ).toBe(true)
  })
})
