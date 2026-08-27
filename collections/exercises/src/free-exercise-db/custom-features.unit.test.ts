import { describe, expect, it } from "bun:test"
import { deriveCustomExerciseFeatures } from "./custom-features"
import type { FreeExercise } from "./schemas"
import { deriveSelectionFeatures } from "./selection-features"

function labelTwin(partial: Partial<FreeExercise> = {}): FreeExercise {
  const name = partial.name ?? "Some Exercise"
  return {
    id: name.replace(/ /g, "_"),
    name,
    force: null,
    level: "intermediate",
    mechanic: "compound",
    equipment: "dumbbell",
    primaryMuscles: [],
    secondaryMuscles: [],
    instructions: [],
    category: "strength",
    images: [],
    ...partial,
  }
}

describe("deriveCustomExerciseFeatures — the coach-added movements", () => {
  it("files the hand-added lunges as lunges", () => {
    expect(
      deriveCustomExerciseFeatures({
        title: "Goblet Reverse Lunge",
        category: "strength",
        equipment: "dumbbell",
        mechanic: "compound",
        primaryMuscles: ["quadriceps", "glutes"],
      }).movementPattern
    ).toBe("lunge")
    expect(
      deriveCustomExerciseFeatures({
        title: "Goblet Bulgarian Split Squat",
        category: "strength",
        equipment: "dumbbell",
        mechanic: "compound",
        primaryMuscles: ["quadriceps", "glutes"],
      }).movementPattern
    ).toBe("lunge")
    expect(
      deriveCustomExerciseFeatures({
        title: "Bodyweight Reverse Lunge",
        category: "strength",
        equipment: "body-only",
        mechanic: "compound",
        primaryMuscles: ["quadriceps", "glutes"],
      }).movementPattern
    ).toBe("lunge")
  })

  it("files the hand-added carries as carries", () => {
    expect(
      deriveCustomExerciseFeatures({
        title: "Farmer's Carry",
        category: "strength",
        equipment: "dumbbell",
        mechanic: "compound",
        primaryMuscles: ["forearms", "traps"],
      }).movementPattern
    ).toBe("carry")
    expect(
      deriveCustomExerciseFeatures({
        title: "Suitcase Carry",
        category: "strength",
        equipment: "kettlebells",
        mechanic: "compound",
        primaryMuscles: ["abdominals"],
      }).movementPattern
    ).toBe("carry")
    expect(
      deriveCustomExerciseFeatures({
        title: "Waiter Walk",
        category: "strength",
        equipment: "kettlebells",
        mechanic: "compound",
        primaryMuscles: ["shoulders"],
      }).movementPattern
    ).toBe("carry")
  })

  it("reads the one-side carries as unilateral and the two-hand carry as bilateral", () => {
    expect(
      deriveCustomExerciseFeatures({
        title: "Suitcase Carry",
        category: "strength",
        equipment: "kettlebells",
        mechanic: "compound",
        primaryMuscles: ["abdominals"],
      }).laterality
    ).toBe("unilateral")
    expect(
      deriveCustomExerciseFeatures({
        title: "Waiter Walk",
        category: "strength",
        equipment: "kettlebells",
        mechanic: "compound",
        primaryMuscles: ["shoulders"],
      }).laterality
    ).toBe("unilateral")
    expect(
      deriveCustomExerciseFeatures({
        title: "Farmer's Carry",
        category: "strength",
        equipment: "dumbbell",
        mechanic: "compound",
        primaryMuscles: ["forearms", "traps"],
      }).laterality
    ).toBe("bilateral")
  })

  it("files a hand-added stretch as mobility", () => {
    expect(
      deriveCustomExerciseFeatures({
        title: "Couch Stretch",
        category: "stretching",
        equipment: "body-only",
        mechanic: "compound",
        primaryMuscles: ["quadriceps"],
      }).movementPattern
    ).toBe("mobility")
  })
})

describe("deriveCustomExerciseFeatures — slug ids round-trip to dataset labels", () => {
  it("maps body-only to the body-supported equipment label", () => {
    const custom = deriveCustomExerciseFeatures({
      title: "Bodyweight Reverse Lunge",
      category: "strength",
      equipment: "body-only",
      mechanic: "compound",
      primaryMuscles: ["quadriceps", "glutes"],
    })
    expect(custom.gripDemand).toBe("none")
    expect(custom).toEqual(
      deriveSelectionFeatures(
        labelTwin({
          name: "Bodyweight Reverse Lunge",
          equipment: "body only",
          primaryMuscles: ["quadriceps", "glutes"],
        })
      )
    )
  })

  it("maps lower-back to the compound-fallback muscle label", () => {
    const custom = deriveCustomExerciseFeatures({
      title: "Jefferson Curl",
      category: "strength",
      equipment: "dumbbell",
      mechanic: "compound",
      primaryMuscles: ["lower-back"],
    })
    expect(custom.movementPattern).toBe("hinge")
    expect(custom).toEqual(
      deriveSelectionFeatures(labelTwin({ name: "Jefferson Curl", primaryMuscles: ["lower back"] }))
    )
  })

  it("maps olympic-weightlifting to the ballistic, high-skill category label", () => {
    const custom = deriveCustomExerciseFeatures({
      title: "Sotts Press",
      category: "olympic-weightlifting",
      equipment: "barbell",
      mechanic: "compound",
      primaryMuscles: ["shoulders"],
    })
    expect(custom.isBallistic).toBe(true)
    expect(custom.skillCost).toBe("high")
    expect(custom).toEqual(
      deriveSelectionFeatures(
        labelTwin({
          name: "Sotts Press",
          category: "olympic weightlifting",
          equipment: "barbell",
          primaryMuscles: ["shoulders"],
        })
      )
    )
  })

  it("tolerates a sparsely-classified input", () => {
    expect(() => deriveCustomExerciseFeatures({ title: "Sled Push" })).not.toThrow()
    expect(deriveCustomExerciseFeatures({ title: "Sled Push" }).movementPattern).toBe("gait")
  })

  it("returns a complete feature vector — every key present, none undefined", () => {
    const custom = deriveCustomExerciseFeatures({
      title: "Farmer's Carry",
      category: "strength",
      equipment: "dumbbell",
      mechanic: "compound",
      primaryMuscles: ["forearms", "traps"],
    })
    expect(custom).toEqual({
      movementPattern: "carry",
      laterality: "bilateral",
      isBallistic: false,
      skillCost: "moderate",
      trainsLengthenedRange: false,
      gripDemand: "high",
      sfrScore: 3,
      muscleFocus: "pull",
    })
    expect(Object.keys(custom)).toHaveLength(8)
  })
})
