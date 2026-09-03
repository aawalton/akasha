import type { Exercise } from "../../exercise.page-type.ts"

export const pyramid = {
  id: "019ebc77-c8ef-7e5a-b5cc-ea201e8b72d3",
  pageTypeSlug: "exercise",
  slug: "pyramid",
  title: "Pyramid",
  exerciseCategory: "stretching",
  equipment: "exercise-ball",
  exerciseExternalId: "Pyramid",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Pyramid",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pyramid/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pyramid/0.jpg",
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
  secondaryMuscles: ["shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
