import type { Exercise } from "../../exercise.page-type.ts"

export const skating = {
  id: "019ebc78-6913-7efa-8656-a623aa145feb",
  pageTypeSlug: "exercise",
  slug: "skating",
  title: "Skating",
  exerciseCategory: "cardio",
  equipment: "other",
  exerciseExternalId: "Skating",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Skating",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Skating/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Skating/0.jpg",
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
  secondaryMuscles: ["abductors", "adductors", "calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
