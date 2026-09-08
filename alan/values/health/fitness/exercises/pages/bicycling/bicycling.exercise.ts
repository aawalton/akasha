import type { Exercise } from "../../exercise.page-type.ts"

export const bicycling = {
  id: "019ebc76-a6ee-7b73-8762-ede5de71d026",
  pageTypeSlug: "exercise",
  slug: "bicycling",
  title: "Bicycling",
  exerciseCategory: "cardio",
  equipment: "other",
  exerciseExternalId: "Bicycling",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bicycling",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bicycling/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bicycling/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "conditioning",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
