import type { Exercise } from "../../exercise.page-type.ts"

export const middleBackStretch = {
  id: "019ebc77-9be7-7e95-96aa-cfa5ef8de7a6",
  pageTypeSlug: "exercise",
  slug: "middle-back-stretch",
  title: "Middle Back Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Middle_Back_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Middle_Back_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Middle_Back_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Middle_Back_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "time",
  secondaryMuscles: ["abdominals", "lats", "lower-back"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
