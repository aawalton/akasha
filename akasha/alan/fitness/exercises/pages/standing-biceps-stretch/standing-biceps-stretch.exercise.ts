import type { Exercise } from "../../exercise.page-type.ts"

export const standingBicepsStretch = {
  id: "019ebc78-82b5-7ff6-8f84-2f3db20a60ba",
  pageTypeSlug: "exercise",
  slug: "standing-biceps-stretch",
  title: "Standing Biceps Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Standing_Biceps_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Biceps_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Biceps_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Biceps_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "time",
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
