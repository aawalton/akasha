import type { Exercise } from "../../exercise.page-type.ts"

export const upperBackStretch = {
  id: "019ebc78-af60-7ee4-a837-1e57b72b4033",
  pageTypeSlug: "exercise",
  slug: "upper-back-stretch",
  title: "Upper Back Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Upper_Back_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Upper_Back_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upper_Back_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upper_Back_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "time",
  secondaryMuscles: ["middle-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
