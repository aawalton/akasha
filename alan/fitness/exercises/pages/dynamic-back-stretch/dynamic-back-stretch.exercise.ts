import type { Exercise } from "../../exercise.page-type.ts"

export const dynamicBackStretch = {
  id: "019ebc77-2c20-7abe-b2f3-15a770471670",
  pageTypeSlug: "exercise",
  slug: "dynamic-back-stretch",
  title: "Dynamic Back Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Dynamic_Back_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Dynamic_Back_Stretch",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dynamic_Back_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dynamic_Back_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
