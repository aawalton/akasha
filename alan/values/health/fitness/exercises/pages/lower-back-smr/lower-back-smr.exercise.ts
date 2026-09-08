import type { Exercise } from "../../exercise.page-type.ts"

export const lowerBackSmr = {
  id: "019ebc77-9209-7d4a-b9ed-39d0c21bcb1a",
  pageTypeSlug: "exercise",
  slug: "lower-back-smr",
  title: "Lower Back-SMR",
  exerciseCategory: "stretching",
  equipment: "foam-roll",
  exerciseExternalId: "Lower_Back-SMR",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lower_Back-SMR",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lower_Back-SMR/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lower_Back-SMR/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
