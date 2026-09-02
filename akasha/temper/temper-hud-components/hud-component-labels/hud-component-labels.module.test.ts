import { describe, expect, test } from "bun:test"
import {
  COMPONENT_LABELS,
  humanizeGlobal,
  UNCATEGORIZED,
} from "./hud-component-labels.module.code.ts"

describe("hud-component-labels", () => {
  test("a labelled global carries a name and a category", () => {
    expect(COMPONENT_LABELS["DEATH_RECAP_FRAGMENT"]).toEqual({
      name: "Death recap",
      category: "death",
    })
  })

  test("a global wrapping several controls says so", () => {
    expect(COMPONENT_LABELS["UNIT_FRAMES_FRAGMENT"]?.wrapsMultiple).toBe(true)
  })

  test("an unlabelled global is humanized from its own spelling", () => {
    expect(humanizeGlobal("SOME_NEW_THING_FRAGMENT")).toBe("Some new thing")
  })

  test("a global spelled as nothing but the suffix is left alone", () => {
    expect(humanizeGlobal("_FRAGMENT")).toBe("_FRAGMENT")
  })

  test("the fallback category is named here", () => {
    expect(UNCATEGORIZED).toBe("uncategorized")
  })
})
