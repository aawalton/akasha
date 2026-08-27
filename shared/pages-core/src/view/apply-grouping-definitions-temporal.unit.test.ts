import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import {
  allProps,
  dateDef,
  defOf,
  instantDef,
  jsonDef,
  markdownDef,
  numberDef,
  row,
  textDef,
  urlDef,
} from "./_apply-grouping-definitions-test-helpers"
import { getPageGroupDefinition } from "./apply-grouping"

describe("getPageGroupDefinition — calendar-date", () => {
  test("returns date string as key", () => {
    const def = defOf("due", [dateDef])
    expect(def.getKey(row("1", { due: "2026-01-15" }))).toBe("2026-01-15")
  })

  test("missing value returns __none__", () => {
    const def = defOf("due", [dateDef])
    expect(def.getKey(row("1", {}))).toBe("__none__")
  })

  test("empty string returns __none__", () => {
    const def = defOf("due", [dateDef])
    expect(def.getKey(row("1", { due: "" }))).toBe("__none__")
  })

  test("labels date with formatSmartDate", () => {
    const def = defOf("due", [dateDef])
    const label = def.getLabel("2026-01-15")
    expect(typeof label).toBe("string")
    expect(label).not.toBe("__none__")
  })

  test("labels __none__ as 'None'", () => {
    const def = defOf("due", [dateDef])
    expect(def.getLabel("__none__")).toBe("No Value")
  })
})

describe("getPageGroupDefinition — instant", () => {
  test("returns ISO date slice as key", () => {
    const def = defOf("created", [instantDef])
    const ts = new Date("2026-01-15T12:00:00Z").getTime()
    expect(def.getKey(row("1", { created: ts }))).toBe("2026-01-15")
  })

  test("non-number value returns __none__", () => {
    const def = defOf("created", [instantDef])
    expect(def.getKey(row("1", { created: "not-a-number" }))).toBe("__none__")
  })

  test("missing value returns __none__", () => {
    const def = defOf("created", [instantDef])
    expect(def.getKey(row("1", {}))).toBe("__none__")
  })

  test("null value returns __none__", () => {
    const def = defOf("created", [instantDef])
    expect(def.getKey(row("1", { created: null }))).toBe("__none__")
  })

  test("labels __none__ as 'None'", () => {
    const def = defOf("created", [instantDef])
    expect(def.getLabel("__none__")).toBe("No Value")
  })

  test("labels date with formatSmartDate", () => {
    const def = defOf("created", [instantDef])
    const label = def.getLabel("2026-01-15")
    expect(typeof label).toBe("string")
    expect(label).not.toBe("__none__")
  })
})

describe("getPageGroupDefinition — scalar fallback", () => {
  const textGroupableDef: PropertyDefinition = { ...textDef, groupable: true }
  const numberGroupableDef: PropertyDefinition = { ...numberDef, groupable: true }
  const urlGroupableDef: PropertyDefinition = { ...urlDef, groupable: true }

  test("string value returns stringified", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getKey(row("1", { title: "Hello" }))).toBe("Hello")
  })

  test("number value returns stringified", () => {
    const def = defOf("priority", [numberGroupableDef])
    expect(def.getKey(row("1", { priority: 42 }))).toBe("42")
  })

  test("boolean value returns stringified", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getKey(row("1", { title: true }))).toBe("true")
  })

  test("null value returns __none__", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getKey(row("1", { title: null }))).toBe("__none__")
  })

  test("undefined (missing) value returns __none__", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getKey(row("1", {}))).toBe("__none__")
  })

  test("empty string returns __none__", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getKey(row("1", { title: "" }))).toBe("__none__")
  })

  test("object value returns __none__", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getKey(row("1", { title: { nested: true } }))).toBe("__none__")
  })

  test("array value returns __none__", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getKey(row("1", { title: [1, 2, 3] }))).toBe("__none__")
  })

  test("labels key as-is", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getLabel("Hello")).toBe("Hello")
  })

  test("labels __none__ as 'None'", () => {
    const def = defOf("title", [textGroupableDef])
    expect(def.getLabel("__none__")).toBe("No Value")
  })

  test("url type uses scalar fallback", () => {
    const def = defOf("link", [urlGroupableDef])
    expect(def.getKey(row("1", { link: "https://example.com" }))).toBe("https://example.com")
  })

  test("number 0 returns '0' (not __none__)", () => {
    const def = defOf("priority", [numberGroupableDef])
    expect(def.getKey(row("1", { priority: 0 }))).toBe("0")
  })
})

describe("getPageGroupDefinition — non-groupable", () => {
  test("markdown type returns null", () => {
    expect(getPageGroupDefinition("body", [markdownDef])).toBeNull()
  })

  test("json type returns null", () => {
    expect(getPageGroupDefinition("meta", [jsonDef])).toBeNull()
  })

  test("unknown property id returns null", () => {
    expect(getPageGroupDefinition("nonexistent", allProps)).toBeNull()
  })
})
