import { describe, expect, test } from "bun:test"
import { normalizeMultiSelect, normalizeSelectValue } from "./select-values"

const EQUIPMENT = ["body only", "dumbbell", "e-z curl bar"] as const
const MUSCLES = ["quadriceps", "glutes", "lower back"] as const

describe("normalizeSelectValue", () => {
  test("accepts an exact slug id", () => {
    expect(normalizeSelectValue("dumbbell", EQUIPMENT, "equipment")).toBe("dumbbell")
  })

  test("accepts the human label (spaces) and slugifies it", () => {
    expect(normalizeSelectValue("body only", EQUIPMENT, "equipment")).toBe("body-only")
    expect(normalizeSelectValue("E-Z Curl Bar", EQUIPMENT, "equipment")).toBe("e-z-curl-bar")
  })

  test("accepts mixed case and the already-slugified form", () => {
    expect(normalizeSelectValue("Body-Only", EQUIPMENT, "equipment")).toBe("body-only")
    expect(normalizeSelectValue("DUMBBELL", EQUIPMENT, "equipment")).toBe("dumbbell")
  })

  test("throws on an unknown value, listing the valid slug ids", () => {
    expect(() => normalizeSelectValue("bodyweight", EQUIPMENT, "equipment")).toThrow(
      /equipment.*bodyweight.*body-only.*dumbbell.*e-z-curl-bar/s
    )
  })
})

describe("normalizeMultiSelect", () => {
  test("splits on commas, trims, and normalizes each value", () => {
    expect(normalizeMultiSelect("Quadriceps, lower back", MUSCLES, "primaryMuscles")).toEqual([
      "quadriceps",
      "lower-back",
    ])
  })

  test("dedupes while preserving first-seen order", () => {
    expect(normalizeMultiSelect("glutes, Glutes, quadriceps", MUSCLES, "primaryMuscles")).toEqual([
      "glutes",
      "quadriceps",
    ])
  })

  test("ignores empty segments from trailing or doubled commas", () => {
    expect(normalizeMultiSelect("glutes,,", MUSCLES, "primaryMuscles")).toEqual(["glutes"])
  })

  test("throws on any unknown member", () => {
    expect(() => normalizeMultiSelect("glutes, biceps", MUSCLES, "primaryMuscles")).toThrow(
      /primaryMuscles.*biceps/s
    )
  })
})
