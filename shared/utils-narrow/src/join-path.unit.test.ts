import { describe, expect, test } from "bun:test"
import { joinPath } from "./join-path"

describe("joinPath", () => {
  test("returns cardId when itemPath is undefined", () => {
    expect(joinPath("daily-writs")).toBe("daily-writs")
  })

  test("returns cardId when itemPath is null", () => {
    expect(joinPath("daily-writs", null)).toBe("daily-writs")
  })

  test("returns cardId when itemPath is an empty array", () => {
    expect(joinPath("daily-writs", [])).toBe("daily-writs")
  })

  test("joins a single string segment", () => {
    expect(joinPath("mount-training", ["speed"])).toBe("mount-training/speed")
  })

  test("joins multiple segments with mixed strings and numbers", () => {
    expect(joinPath("recipes", [1, 10])).toBe("recipes/1/10")
    expect(joinPath("trait-research", ["clothing", 1, 2])).toBe("trait-research/clothing/1/2")
  })
})
