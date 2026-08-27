import { describe, expect, test } from "bun:test"
import { computeNextSideFile, parseSideFile, type SideFile, serializeSideFile } from "./side-file"

const SAMPLE: SideFile = {
  version: 1,
  invalidateVersion: 7,
  invalidateDomains: ["achievementCatalog", "recipeCatalog"],
}

describe("parseSideFile", () => {
  test("empty / placeholder content returns undefined", () => {
    expect(parseSideFile("")).toBeUndefined()
    expect(parseSideFile("TemperCatalogConfig = nil\n")).toBeUndefined()
  })

  test("parses a populated assignment", () => {
    const lua =
      'TemperCatalogConfig =\n{\n    ["version"] = 1,\n    ["invalidateVersion"] = 7,\n    ["invalidateDomains"] =\n    {\n        "achievementCatalog",\n        "recipeCatalog",\n    },\n}\n'
    const result = parseSideFile(lua)
    expect(result).toEqual(SAMPLE)
  })

  test("missing invalidateDomains defaults to empty array", () => {
    const lua =
      'TemperCatalogConfig =\n{\n    ["version"] = 1,\n    ["invalidateVersion"] = 3,\n}\n'
    const result = parseSideFile(lua)
    expect(result).toEqual({
      version: 1,
      invalidateVersion: 3,
      invalidateDomains: [],
    })
  })

  test("malformed structure (no version key) returns undefined", () => {
    const lua = 'TemperCatalogConfig =\n{\n    ["invalidateVersion"] = 1,\n}\n'
    expect(parseSideFile(lua)).toBeUndefined()
  })
})

describe("serializeSideFile", () => {
  test("emits a parseable Lua assignment", () => {
    const out = serializeSideFile(SAMPLE)
    expect(out).toContain("TemperCatalogConfig =")
    expect(out.endsWith("\n")).toBe(true)
  })

  test("round-trip via parseSideFile preserves the value", () => {
    expect(parseSideFile(serializeSideFile(SAMPLE))).toEqual(SAMPLE)
  })

  test("empty invalidateDomains round-trips", () => {
    const empty: SideFile = {
      version: 1,
      invalidateVersion: 0,
      invalidateDomains: [],
    }
    expect(parseSideFile(serializeSideFile(empty))).toEqual(empty)
  })
})

describe("computeNextSideFile", () => {
  test("from absent (undefined) uses `now` when `now > 1`", () => {
    const next = computeNextSideFile(undefined, ["achievementCatalog"], 1716998400000)
    expect(next).toEqual({
      version: 1,
      invalidateVersion: 1716998400000,
      invalidateDomains: ["achievementCatalog"],
    })
  })

  test("from absent with `now = 0` falls back to the +1 floor (1)", () => {
    const next = computeNextSideFile(undefined, ["achievementCatalog"], 0)
    expect(next.invalidateVersion).toBe(1)
  })

  test("uses `max(prev + 1, now)` so a large prior counter wins over an earlier clock", () => {
    const prev: SideFile = {
      version: 1,
      invalidateVersion: 1716999999999,
      invalidateDomains: ["loreLibraryCatalog"],
    }
    const next = computeNextSideFile(prev, ["recipeCatalog"], 1716998400000)
    expect(next.invalidateVersion).toBe(1717000000000)
    expect(next.invalidateDomains).toEqual(["recipeCatalog"])
    expect(next.version).toBe(1)
  })

  test("uses `now` when `now` exceeds the +1 floor", () => {
    const prev: SideFile = {
      version: 1,
      invalidateVersion: 5,
      invalidateDomains: ["loreLibraryCatalog"],
    }
    const next = computeNextSideFile(prev, ["recipeCatalog"], 1716998400000)
    expect(next.invalidateVersion).toBe(1716998400000)
  })

  test("explicit empty-array request encodes --all (per side-file contract)", () => {
    const next = computeNextSideFile(undefined, [], 1716998400000)
    expect(next.invalidateDomains).toEqual([])
    expect(next.invalidateVersion).toBe(1716998400000)
  })

  test("deduplicates and sorts the requested domain list deterministically", () => {
    const next = computeNextSideFile(
      undefined,
      ["recipeCatalog", "achievementCatalog", "recipeCatalog"],
      1716998400000
    )
    expect(next.invalidateDomains).toEqual(["achievementCatalog", "recipeCatalog"])
  })
})
