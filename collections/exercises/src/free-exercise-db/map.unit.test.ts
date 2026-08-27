import { describe, expect, it } from "bun:test"
import {
  exerciseExternalLink,
  exerciseImageUrl,
  exerciseToProps,
  instructionsToMarkdown,
  slugifyOptionId,
} from "./map"
import type { FreeExercise } from "./schemas"

const TODAY = "2026-06-12"

function exercise(partial: Partial<FreeExercise> = {}): FreeExercise {
  return {
    id: "3_4_Sit-Up",
    name: "3/4 Sit-Up",
    force: "pull",
    level: "beginner",
    mechanic: "compound",
    equipment: "body only",
    primaryMuscles: ["abdominals"],
    secondaryMuscles: ["lower back", "middle back"],
    instructions: ["Lie down on the floor.", "Flex your hips and spine.", "Return slowly."],
    category: "strength",
    images: ["3_4_Sit-Up/0.jpg", "3_4_Sit-Up/1.jpg"],
    ...partial,
  }
}

describe("slugifyOptionId", () => {
  it("lowercases and hyphenates non-alphanumeric runs", () => {
    expect(slugifyOptionId("body only")).toBe("body-only")
    expect(slugifyOptionId("olympic weightlifting")).toBe("olympic-weightlifting")
    expect(slugifyOptionId("e-z curl bar")).toBe("e-z-curl-bar")
  })

  it("passes through already-slug values unchanged", () => {
    expect(slugifyOptionId("pull")).toBe("pull")
    expect(slugifyOptionId("beginner")).toBe("beginner")
  })
})

describe("instructionsToMarkdown", () => {
  it("renders steps as a numbered markdown list", () => {
    expect(instructionsToMarkdown(["First.", "Second.", "Third."])).toBe(
      "1. First.\n2. Second.\n3. Third."
    )
  })

  it("renders an empty list as an empty string", () => {
    expect(instructionsToMarkdown([])).toBe("")
  })
})

describe("exerciseExternalLink / exerciseImageUrl", () => {
  it("points the external link at the exercise's image directory on GitHub", () => {
    expect(exerciseExternalLink("3_4_Sit-Up")).toBe(
      "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/3_4_Sit-Up"
    )
  })

  it("builds image URLs from the raw-content base", () => {
    expect(exerciseImageUrl("3_4_Sit-Up/0.jpg")).toBe(
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/0.jpg"
    )
  })
})

describe("exerciseToProps", () => {
  it("maps a full exercise to all page props", () => {
    const props = exerciseToProps({ exercise: exercise(), today: TODAY })
    expect(props).toEqual({
      title: "3/4 Sit-Up",
      externalId: "3_4_Sit-Up",
      externalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/3_4_Sit-Up",
      source: "free-exercise-db",
      level: "beginner",
      category: "strength",
      force: "pull",
      mechanic: "compound",
      equipment: "body-only",
      primaryMuscles: ["abdominals"],
      secondaryMuscles: ["lower-back", "middle-back"],
      instructions: "1. Lie down on the floor.\n2. Flex your hips and spine.\n3. Return slowly.",
      imageStartUrl:
        "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/0.jpg",
      imageEndUrl:
        "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/1.jpg",
      implementCount: 1,
      loadFactor: 0,
      movementPattern: "isolation-other",
      laterality: "bilateral",
      isBallistic: false,
      skillCost: "moderate",
      trainsLengthenedRange: false,
      gripDemand: "none",
      sfrScore: 3,
      muscleFocus: "core",
      lastSyncedAt: TODAY,
    })
  })

  it("omits force/mechanic/equipment keys entirely when the dataset value is null", () => {
    const props = exerciseToProps({
      exercise: exercise({ force: null, mechanic: null, equipment: null }),
      today: TODAY,
    })
    expect("force" in props).toBe(false)
    expect("mechanic" in props).toBe(false)
    expect("equipment" in props).toBe(false)
  })

  it("slugifies select and multi-select values to match seeded option ids", () => {
    const props = exerciseToProps({
      exercise: exercise({
        equipment: "e-z curl bar",
        category: "olympic weightlifting",
        primaryMuscles: ["lower back"],
      }),
      today: TODAY,
    })
    expect(props.equipment).toBe("e-z-curl-bar")
    expect(props.category).toBe("olympic-weightlifting")
    expect(props.primaryMuscles).toEqual(["lower-back"])
  })

  it("applies a curated classification override, slugifying its values", () => {
    const props = exerciseToProps({
      exercise: exercise({
        id: "Crossover_Reverse_Lunge",
        name: "Crossover Reverse Lunge",
        force: "pull",
        mechanic: null,
        equipment: null,
        category: "stretching",
        primaryMuscles: ["lower back"],
        secondaryMuscles: ["abdominals", "abductors", "glutes", "hamstrings", "quadriceps"],
      }),
      today: TODAY,
    })
    expect(props.category).toBe("strength")
    expect(props.force).toBe("push")
    expect(props.mechanic).toBe("compound")
    expect(props.equipment).toBe("body-only")
    expect(props.primaryMuscles).toEqual(["quadriceps", "glutes"])
    expect(props.secondaryMuscles).toEqual(["hamstrings", "abductors", "abdominals"])
    expect(props.movementPattern).toBe("lunge")
    expect(props.isBallistic).toBe(false)
  })

  it("omits image URL keys when the images array lacks entries", () => {
    const none = exerciseToProps({
      exercise: exercise({ images: [] }),
      today: TODAY,
    })
    expect("imageStartUrl" in none).toBe(false)
    expect("imageEndUrl" in none).toBe(false)

    const startOnly = exerciseToProps({
      exercise: exercise({ images: ["3_4_Sit-Up/0.jpg"] }),
      today: TODAY,
    })
    expect(startOnly.imageStartUrl).toBe(
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/0.jpg"
    )
    expect("imageEndUrl" in startOnly).toBe(false)
  })
})
