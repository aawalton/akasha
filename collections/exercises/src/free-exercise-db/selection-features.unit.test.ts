import { describe, expect, it } from "bun:test"
import type { FreeExercise } from "./schemas"
import {
  deriveGripDemand,
  deriveMovementPattern,
  deriveSelectionFeatures,
  deriveSkillCost,
  deriveTrainsLengthenedRange,
  MOVEMENT_PATTERN_OPTIONS,
  selectionFeatureProps,
} from "./selection-features"

function exercise(partial: Partial<FreeExercise> = {}): FreeExercise {
  const name = partial.name ?? "Some Exercise"
  return {
    id: partial.id ?? name.replace(/ /g, "_"),
    name,
    force: "push",
    level: "intermediate",
    mechanic: "compound",
    equipment: "dumbbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: [],
    instructions: [],
    category: "strength",
    images: [],
    ...partial,
  }
}

describe("deriveMovementPattern", () => {
  it("classifies the horizontal / vertical push-pull quadrants", () => {
    expect(
      deriveMovementPattern(exercise({ name: "Dumbbell Bench Press", primaryMuscles: ["chest"] }))
    ).toBe("h-push")
    expect(
      deriveMovementPattern(
        exercise({ name: "Standing Military Press", primaryMuscles: ["shoulders"] })
      )
    ).toBe("v-push")
    expect(
      deriveMovementPattern(
        exercise({ name: "Bent Over Barbell Row", primaryMuscles: ["middle back"] })
      )
    ).toBe("h-pull")
    expect(deriveMovementPattern(exercise({ name: "Pullups", primaryMuscles: ["lats"] }))).toBe(
      "v-pull"
    )
  })

  it("classifies the lower-body squat / hinge / lunge patterns, most specific first", () => {
    expect(
      deriveMovementPattern(exercise({ name: "Barbell Squat", primaryMuscles: ["quadriceps"] }))
    ).toBe("squat")
    expect(
      deriveMovementPattern(exercise({ name: "Romanian Deadlift", primaryMuscles: ["hamstrings"] }))
    ).toBe("hinge")
    expect(
      deriveMovementPattern(
        exercise({ name: "Goblet Bulgarian Split Squat", primaryMuscles: ["quadriceps"] })
      )
    ).toBe("lunge")
    expect(
      deriveMovementPattern(
        exercise({ id: "Front_Squat_Clean_Grip", name: "Front Squat (Clean Grip)" })
      )
    ).toBe("squat")
  })

  it("classifies the functional core anti-patterns", () => {
    expect(
      deriveMovementPattern(exercise({ name: "Dead Bug", primaryMuscles: ["abdominals"] }))
    ).toBe("core-anti-extension")
    expect(
      deriveMovementPattern(exercise({ name: "Pallof Press", primaryMuscles: ["abdominals"] }))
    ).toBe("core-anti-rotation")
    expect(
      deriveMovementPattern(exercise({ name: "Side Plank", primaryMuscles: ["abdominals"] }))
    ).toBe("core-anti-lateral-flexion")
  })

  it("files isolation and unmatched work as isolation-other", () => {
    expect(
      deriveMovementPattern(
        exercise({
          name: "Side Lateral Raise",
          mechanic: "isolation",
          primaryMuscles: ["shoulders"],
        })
      )
    ).toBe("isolation-other")
    expect(
      deriveMovementPattern(
        exercise({ name: "Concentration Curls", mechanic: "isolation", primaryMuscles: ["biceps"] })
      )
    ).toBe("isolation-other")
  })

  it("honors curated id-keyed overrides", () => {
    expect(
      deriveMovementPattern(
        exercise({ id: "Goblet_Squat", name: "Goblet Squat", equipment: "kettlebells" })
      )
    ).toBe("squat")
  })

  it("files the windmill family as anti-lateral-flexion core work", () => {
    expect(
      deriveMovementPattern(
        exercise({
          id: "Kettlebell_Windmill",
          name: "Kettlebell Windmill",
          equipment: "kettlebells",
          primaryMuscles: ["abdominals"],
        })
      )
    ).toBe("core-anti-lateral-flexion")
    expect(
      deriveMovementPattern(
        exercise({
          id: "Double_Kettlebell_Windmill",
          name: "Double Kettlebell Windmill",
          equipment: "kettlebells",
          primaryMuscles: ["abdominals"],
        })
      )
    ).toBe("core-anti-lateral-flexion")
    expect(
      deriveMovementPattern(
        exercise({
          id: "Advanced_Kettlebell_Windmill",
          name: "Advanced Kettlebell Windmill",
          equipment: "kettlebells",
          primaryMuscles: ["abdominals"],
        })
      )
    ).toBe("core-anti-lateral-flexion")
  })

  it("files a spider crawl as gait", () => {
    expect(
      deriveMovementPattern(
        exercise({
          id: "Spider_Crawl",
          name: "Spider Crawl",
          equipment: "body only",
          primaryMuscles: ["abdominals"],
        })
      )
    ).toBe("gait")
  })
})

describe("deriveMovementPattern — the stretching category is mobility", () => {
  it("carries the two non-strength patterns as the trailing movement-pattern options", () => {
    expect(MOVEMENT_PATTERN_OPTIONS).toContain("mobility")
    expect(MOVEMENT_PATTERN_OPTIONS.slice(-2)).toEqual(["mobility", "conditioning"])
  })

  it("files a stretching row as mobility whatever its name or muscle would match", () => {
    expect(
      deriveMovementPattern(
        exercise({ name: "Cat Stretch", category: "stretching", primaryMuscles: ["lower back"] })
      )
    ).toBe("mobility")
    expect(
      deriveMovementPattern(
        exercise({
          name: "Deep Squat Hold",
          category: "stretching",
          primaryMuscles: ["quadriceps"],
        })
      )
    ).toBe("mobility")
    expect(
      deriveMovementPattern(
        exercise({ name: "Dynamic Back Stretch", category: "stretching", primaryMuscles: ["lats"] })
      )
    ).toBe("mobility")
    expect(
      deriveMovementPattern(
        exercise({
          name: "Standing Chest Opener",
          category: "stretching",
          mechanic: "isolation",
          primaryMuscles: ["chest"],
        })
      )
    ).toBe("mobility")
  })

  it("keys on the category, not the name — the same names under strength keep their patterns", () => {
    expect(
      deriveMovementPattern(
        exercise({ name: "Cat Stretch", category: "strength", primaryMuscles: ["lower back"] })
      )
    ).toBe("hinge")
    expect(
      deriveMovementPattern(
        exercise({ name: "Deep Squat Hold", category: "strength", primaryMuscles: ["quadriceps"] })
      )
    ).toBe("squat")
  })

  it("still lets a curated id-keyed override win over the stretching rule", () => {
    expect(
      deriveMovementPattern(
        exercise({
          id: "Goblet_Squat",
          name: "Goblet Squat",
          category: "stretching",
          equipment: "kettlebells",
        })
      )
    ).toBe("squat")
  })
})

describe("deriveMovementPattern — the cardio category is conditioning", () => {
  it("files a cardio row as conditioning whatever its name or muscle would match", () => {
    const rows: readonly [string, string][] = [
      ["High Knees", "quadriceps"],
      ["Rowing, Stationary", "middle back"],
      ["Trail Running/Walking", "quadriceps"],
      ["Bicycling", "quadriceps"],
    ]
    for (const [name, muscle] of rows) {
      expect(
        deriveMovementPattern(exercise({ name, category: "cardio", primaryMuscles: [muscle] }))
      ).toBe("conditioning")
    }
  })

  it("keys on the category, not the name — the same names under strength keep their patterns", () => {
    expect(
      deriveMovementPattern(
        exercise({ name: "High Knees", category: "strength", primaryMuscles: ["quadriceps"] })
      )
    ).toBe("squat")
  })

  it("still lets a curated id-keyed override win over the cardio rule", () => {
    expect(
      deriveMovementPattern(
        exercise({ id: "Spider_Crawl", name: "Spider Crawl", category: "cardio" })
      )
    ).toBe("gait")
  })
})

describe("deriveSkillCost", () => {
  it("rates Olympic and complex movements high", () => {
    expect(deriveSkillCost(exercise({ name: "Snatch", category: "olympic weightlifting" }))).toBe(
      "high"
    )
    expect(deriveSkillCost(exercise({ name: "Turkish Get-Up" }))).toBe("high")
  })

  it("rates isolation and machine work low", () => {
    expect(deriveSkillCost(exercise({ name: "Concentration Curls", mechanic: "isolation" }))).toBe(
      "low"
    )
    expect(deriveSkillCost(exercise({ name: "Leg Press", equipment: "machine" }))).toBe("low")
  })

  it("rates free-weight compounds moderate", () => {
    expect(deriveSkillCost(exercise({ name: "Dumbbell Bench Press" }))).toBe("moderate")
    expect(
      deriveSkillCost(exercise({ name: "One-Arm Kettlebell Swings", equipment: "kettlebells" }))
    ).toBe("moderate")
  })
})

describe("deriveGripDemand", () => {
  it("rates deadlifts / swings / carries / pulls high", () => {
    expect(deriveGripDemand(exercise({ name: "Romanian Deadlift" }))).toBe("high")
    expect(
      deriveGripDemand(exercise({ name: "One-Arm Kettlebell Swings", equipment: "kettlebells" }))
    ).toBe("high")
    expect(deriveGripDemand(exercise({ name: "Pullups", primaryMuscles: ["lats"] }))).toBe("high")
  })

  it("does not over-rate a bilateral goblet hold", () => {
    expect(
      deriveGripDemand(
        exercise({ name: "Goblet Squat", equipment: "kettlebells", primaryMuscles: ["quadriceps"] })
      )
    ).toBe("low")
  })

  it("rates body-supported leg / core work as no-grip", () => {
    expect(
      deriveGripDemand(
        exercise({ name: "Leg Press", equipment: "machine", primaryMuscles: ["quadriceps"] })
      )
    ).toBe("none")
    expect(
      deriveGripDemand(
        exercise({ name: "Dead Bug", equipment: "body only", primaryMuscles: ["abdominals"] })
      )
    ).toBe("none")
  })
})

describe("deriveTrainsLengthenedRange", () => {
  it("flags stretch-loaded movements", () => {
    expect(deriveTrainsLengthenedRange(exercise({ name: "Romanian Deadlift" }))).toBe(true)
    expect(deriveTrainsLengthenedRange(exercise({ name: "Incline Dumbbell Curl" }))).toBe(true)
    expect(deriveTrainsLengthenedRange(exercise({ name: "Dumbbell Flyes" }))).toBe(true)
  })

  it("is false for mid-range movements", () => {
    expect(deriveTrainsLengthenedRange(exercise({ name: "One-Arm Kettlebell Swings" }))).toBe(false)
    expect(deriveTrainsLengthenedRange(exercise({ name: "Concentration Curls" }))).toBe(false)
  })
})

describe("deriveSelectionFeatures pins the convergence movements", () => {
  it("derives One-Arm Kettlebell Swings as a ballistic, grip-heavy, unilateral hinge", () => {
    const f = deriveSelectionFeatures(
      exercise({
        id: "One-Arm_Kettlebell_Swings",
        name: "One-Arm Kettlebell Swings",
        force: "pull",
        mechanic: "compound",
        equipment: "kettlebells",
        primaryMuscles: ["hamstrings"],
        secondaryMuscles: ["calves", "glutes", "lower back", "shoulders"],
      })
    )
    expect(f).toEqual({
      movementPattern: "hinge",
      laterality: "unilateral",
      isBallistic: true,
      skillCost: "moderate",
      trainsLengthenedRange: false,
      gripDemand: "high",
      sfrScore: 3,
      muscleFocus: "legs",
    })
  })

  it("derives Concentration Curls as a non-ballistic, high-SFR isolation movement", () => {
    const f = deriveSelectionFeatures(
      exercise({
        id: "Concentration_Curls",
        name: "Concentration Curls",
        force: "pull",
        mechanic: "isolation",
        equipment: "dumbbell",
        primaryMuscles: ["biceps"],
        secondaryMuscles: ["forearms"],
      })
    )
    expect(f).toEqual({
      movementPattern: "isolation-other",
      laterality: "unilateral",
      isBallistic: false,
      skillCost: "low",
      trainsLengthenedRange: false,
      gripDemand: "low",
      sfrScore: 4,
      muscleFocus: "pull",
    })
  })

  it("annotates a hybrid movement with a secondary pattern", () => {
    const f = deriveSelectionFeatures(
      exercise({ id: "Kettlebell_Thruster", name: "Kettlebell Thruster", equipment: "kettlebells" })
    )
    expect(f.secondaryPattern).toBe("v-push")
  })

  it("applies the curated SFR override for maximal grinds", () => {
    expect(
      deriveSelectionFeatures(exercise({ id: "Barbell_Deadlift", name: "Barbell Deadlift" }))
        .sfrScore
    ).toBe(2)
  })
})

describe("selectionFeatureProps", () => {
  const HINGE_FEATURES = {
    movementPattern: "hinge",
    laterality: "unilateral",
    isBallistic: true,
    skillCost: "moderate",
    trainsLengthenedRange: false,
    gripDemand: "high",
    sfrScore: 3,
    muscleFocus: "legs",
  }

  it("emits the eight always-present feature keys, omitting an unset secondaryPattern", () => {
    const props = selectionFeatureProps(HINGE_FEATURES)
    expect(props).toEqual({ ...HINGE_FEATURES })
    expect(Object.keys(props)).toHaveLength(8)
  })

  it("adds secondaryPattern as the ninth key for a curated hybrid", () => {
    const props = selectionFeatureProps({
      ...HINGE_FEATURES,
      movementPattern: "squat",
      secondaryPattern: "v-push",
    })
    expect(props.secondaryPattern).toBe("v-push")
    expect(Object.keys(props)).toHaveLength(9)
  })
})
