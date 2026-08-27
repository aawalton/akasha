import { describe, expect, test } from "bun:test"
import { type PropertyVisibilityMode, resolvePropertyVisibilityMode } from "./view-data"

describe("resolvePropertyVisibilityMode", () => {
  test("id NOT in visibleProperties → 'always-hide'", () => {
    const mode = resolvePropertyVisibilityMode("x", {
      visibleProperties: ["a", "b"],
      alwaysShowProperties: [],
    })
    expect(mode).toBe<PropertyVisibilityMode>("always-hide")
  })

  test("id in visibleProperties AND in alwaysShowProperties → 'always-show'", () => {
    const mode = resolvePropertyVisibilityMode("a", {
      visibleProperties: ["a", "b"],
      alwaysShowProperties: ["a"],
    })
    expect(mode).toBe<PropertyVisibilityMode>("always-show")
  })

  test("id in visibleProperties but NOT in alwaysShowProperties → 'hide-when-empty'", () => {
    const mode = resolvePropertyVisibilityMode("b", {
      visibleProperties: ["a", "b"],
      alwaysShowProperties: ["a"],
    })
    expect(mode).toBe<PropertyVisibilityMode>("hide-when-empty")
  })

  test("id in alwaysShowProperties but NOT in visibleProperties → still 'always-hide' (visibility membership wins)", () => {
    const mode = resolvePropertyVisibilityMode("a", {
      visibleProperties: ["b"],
      alwaysShowProperties: ["a"],
    })
    expect(mode).toBe<PropertyVisibilityMode>("always-hide")
  })

  test("empty lists → 'always-hide' for any id", () => {
    const mode = resolvePropertyVisibilityMode("anything", {
      visibleProperties: [],
      alwaysShowProperties: [],
    })
    expect(mode).toBe<PropertyVisibilityMode>("always-hide")
  })
})
