import { describe, expect, it } from "bun:test"
import { classificationOverrideFor } from "./classification-overrides"

describe("classificationOverrideFor", () => {
  it("returns undefined for an unoverridden id", () => {
    expect(classificationOverrideFor("3_4_Sit-Up")).toBeUndefined()
  })

  it("corrects the misfiled Crossover Reverse Lunge to a strength compound", () => {
    const ov = classificationOverrideFor("Crossover_Reverse_Lunge")
    expect(ov).toEqual({
      category: "strength",
      force: "push",
      mechanic: "compound",
      equipment: "body only",
      primaryMuscles: ["quadriceps", "glutes"],
      secondaryMuscles: ["hamstrings", "abductors", "abdominals"],
    })
  })
})
