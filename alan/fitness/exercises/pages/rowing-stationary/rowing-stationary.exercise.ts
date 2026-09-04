import type { Exercise } from "../../exercise.page-type.ts"

export const rowingStationary = {
  id: "019ebc77-d334-7120-9e10-e07b93b85b41",
  pageTypeSlug: "exercise",
  slug: "rowing-stationary",
  title: "Rowing, Stationary",
  exerciseCategory: "cardio",
  equipment: "machine",
  exerciseExternalId: "Rowing_Stationary",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Rowing_Stationary",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rowing_Stationary/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rowing_Stationary/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "conditioning",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  secondaryMuscles: ["biceps", "calves", "glutes", "hamstrings", "lower-back", "middle-back"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
