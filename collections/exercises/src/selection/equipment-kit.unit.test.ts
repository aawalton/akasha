import { describe, expect, it } from "bun:test"
import { isInKit, kitCategoryFor, requiresNoImplement } from "./equipment-kit"

describe("requiresNoImplement", () => {
  it("accepts the stored slug spelling — the exact mismatch that hid 115 rows", () => {
    expect(requiresNoImplement("body-only")).toBe(true)
  })

  it("accepts the dataset label spelling too (one legacy custom row stores it)", () => {
    expect(requiresNoImplement("body only")).toBe(true)
  })

  it("treats an absent equipment value as needing no implement", () => {
    expect(requiresNoImplement(null)).toBe(true)
  })

  it("is false for anything the client has to own", () => {
    expect(requiresNoImplement("dumbbell")).toBe(false)
    expect(requiresNoImplement("barbell")).toBe(false)
  })
})

describe("kitCategoryFor", () => {
  it("maps the owned dataset implements to their coaching equipment-item category", () => {
    expect(kitCategoryFor("dumbbell")).toBe("dumbbells")
    expect(kitCategoryFor("kettlebells")).toBe("kettlebells")
    expect(kitCategoryFor("bands")).toBe("band")
  })

  it("returns null for a movement needing no implement", () => {
    expect(kitCategoryFor(null)).toBeNull()
    expect(kitCategoryFor("body-only")).toBeNull()
  })

  it("leaves the dataset's `other` grab-bag unmapped — sleds and tires are not a hand gripper", () => {
    expect(kitCategoryFor("other")).toBeNull()
  })

  it("returns null for implements outside the kit vocabulary", () => {
    expect(kitCategoryFor("machine")).toBeNull()
    expect(kitCategoryFor("cable")).toBeNull()
    expect(kitCategoryFor("e-z-curl-bar")).toBeNull()
  })
})

describe("isInKit", () => {
  const available: ReadonlySet<string> = new Set(["dumbbells", "kettlebells", "bench", "other"])

  it("admits bodyweight movements in either spelling", () => {
    expect(isInKit("body-only", available)).toBe(true)
    expect(isInKit("body only", available)).toBe(true)
    expect(isInKit(null, available)).toBe(true)
  })

  it("admits an implement whose kit category is available", () => {
    expect(isInKit("dumbbell", available)).toBe(true)
    expect(isInKit("kettlebells", available)).toBe(true)
  })

  it("rejects an implement whose kit category is not available", () => {
    expect(isInKit("bands", available)).toBe(false)
  })

  it("rejects an unmapped implement even when an `other` item is owned", () => {
    expect(isInKit("other", available)).toBe(false)
    expect(isInKit("machine", available)).toBe(false)
  })
})
