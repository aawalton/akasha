import { describe, expect, test } from "bun:test"
import { DEFAULT_ICON_NAME, resolveIconName, searchIcons } from "./icon"

describe("resolveIconName", () => {
  test("accepts canonical kebab-case names as-is", () => {
    expect(resolveIconName("file-text")).toBe("file-text")
    expect(resolveIconName("house")).toBe("house")
  })

  test("converts legacy PascalCase writes to kebab-case", () => {
    expect(resolveIconName("FileText")).toBe("file-text")
    expect(resolveIconName("Trash2")).toBe("trash-2")
    expect(resolveIconName("ArrowDown01")).toBe("arrow-down-0-1")
    expect(resolveIconName("Clock10")).toBe("clock-10")
  })

  test("resolves aliases to the canonical name", () => {
    expect(resolveIconName("home")).toBe("house")
    expect(resolveIconName("Home")).toBe("house")
  })

  test("falls back for unknown names", () => {
    expect(resolveIconName("not-a-real-icon")).toBe(DEFAULT_ICON_NAME)
    expect(resolveIconName("")).toBe(DEFAULT_ICON_NAME)
    expect(resolveIconName(null)).toBe(DEFAULT_ICON_NAME)
    expect(resolveIconName(undefined)).toBe(DEFAULT_ICON_NAME)
  })
})

describe("searchIcons", () => {
  test("matches on keyword tags (house via 'home')", () => {
    const results = searchIcons("home")
    expect(results.some((e) => e.name === "house")).toBe(true)
  })

  test("matches on alias ('bin' → trash family)", () => {
    const results = searchIcons("bin")
    expect(results.some((e) => e.name === "trash")).toBe(true)
    expect(results.some((e) => e.name === "trash-2")).toBe(true)
  })

  test("empty query returns full catalog", () => {
    const all = searchIcons("")
    expect(all.length).toBeGreaterThan(1000)
  })

  test("whitespace-only query returns full catalog", () => {
    const all = searchIcons("   ")
    expect(all.length).toBeGreaterThan(1000)
  })
})
