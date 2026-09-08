import type { Exercise } from "../../exercise.page-type.ts"

export const overheadTriceps = {
  id: "019ebc77-bdb3-7cb7-a7de-254079c337d6",
  pageTypeSlug: "exercise",
  slug: "overhead-triceps",
  title: "Overhead Triceps",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Overhead_Triceps",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Overhead_Triceps",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Triceps/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Triceps/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "time",
  secondaryMuscles: ["lats"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
