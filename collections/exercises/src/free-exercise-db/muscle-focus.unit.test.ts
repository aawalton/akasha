import { describe, expect, it } from "bun:test"
import type { FreeExercise } from "./schemas"
import { deriveMuscleFocus, MUSCLE_FOCUS_OPTIONS } from "./selection-features"

function exercise(partial: Partial<FreeExercise> = {}): FreeExercise {
  const name = partial.name ?? "Some Exercise"
  return {
    id: partial.id ?? name.replace(/ /g, "_"),
    name,
    force: "push",
    level: "intermediate",
    mechanic: "isolation",
    equipment: "dumbbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: [],
    instructions: [],
    category: "strength",
    images: [],
    ...partial,
  }
}

describe("deriveMuscleFocus", () => {
  it("files pressing musculature as push", () => {
    for (const muscle of ["chest", "shoulders", "triceps"]) {
      expect(deriveMuscleFocus(exercise({ primaryMuscles: [muscle] }))).toBe("push")
    }
  })

  it("files pulling musculature as pull", () => {
    for (const muscle of ["lats", "middle back", "traps", "biceps", "forearms", "lower back"]) {
      expect(deriveMuscleFocus(exercise({ primaryMuscles: [muscle] }))).toBe("pull")
    }
  })

  it("files lower-body musculature as legs", () => {
    for (const muscle of [
      "quadriceps",
      "hamstrings",
      "glutes",
      "calves",
      "abductors",
      "adductors",
    ]) {
      expect(deriveMuscleFocus(exercise({ primaryMuscles: [muscle] }))).toBe("legs")
    }
  })

  it("files abdominals as core", () => {
    expect(deriveMuscleFocus(exercise({ primaryMuscles: ["abdominals"] }))).toBe("core")
  })

  it("falls back to other for musculature outside the split, and for no primary at all", () => {
    expect(deriveMuscleFocus(exercise({ primaryMuscles: ["neck"] }))).toBe("other")
    expect(deriveMuscleFocus(exercise({ primaryMuscles: [] }))).toBe("other")
  })

  it("overrides the shoulders primary to pull for rear-delt work", () => {
    expect(
      deriveMuscleFocus(
        exercise({ name: "Dumbbell Lying Rear Lateral Raise", primaryMuscles: ["shoulders"] })
      )
    ).toBe("pull")
    expect(
      deriveMuscleFocus(exercise({ name: "Reverse Fly", primaryMuscles: ["shoulders"] }))
    ).toBe("pull")
  })

  it("keeps front/side delt work on push", () => {
    expect(
      deriveMuscleFocus(exercise({ name: "Side Lateral Raise", primaryMuscles: ["shoulders"] }))
    ).toBe("push")
    expect(
      deriveMuscleFocus(exercise({ name: "Front Dumbbell Raise", primaryMuscles: ["shoulders"] }))
    ).toBe("push")
  })

  it("classifies the two catalog rows that fought over the pull day's isolation slot", () => {
    expect(
      deriveMuscleFocus(
        exercise({ name: "Close-Grip Dumbbell Press", primaryMuscles: ["triceps"] })
      )
    ).toBe("push")
    expect(
      deriveMuscleFocus(exercise({ name: "Dumbbell Bicep Curl", primaryMuscles: ["biceps"] }))
    ).toBe("pull")
  })

  it("resolves a multi-primary row by its first classified muscle", () => {
    expect(deriveMuscleFocus(exercise({ primaryMuscles: ["quadriceps", "glutes"] }))).toBe("legs")
    expect(deriveMuscleFocus(exercise({ primaryMuscles: ["shoulders", "forearms"] }))).toBe("push")
  })

  it("only ever emits a value from the seeded vocabulary", () => {
    const vocabulary: readonly string[] = MUSCLE_FOCUS_OPTIONS
    expect(vocabulary).toEqual(["push", "pull", "legs", "core", "other"])
    for (const muscle of ["chest", "lats", "glutes", "abdominals", "neck"]) {
      expect(vocabulary).toContain(deriveMuscleFocus(exercise({ primaryMuscles: [muscle] })))
    }
  })
})
