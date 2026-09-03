import type { Exercise } from "../../exercise.page-type.ts"

export const stepMill = {
  id: "019ebc78-a310-7217-a4ca-1a4855cc6e82",
  pageTypeSlug: "exercise",
  slug: "step-mill",
  title: "Step Mill",
  exerciseCategory: "cardio",
  equipment: "machine",
  exerciseExternalId: "Step_Mill",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Step_Mill",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Step_Mill/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Step_Mill/0.jpg",
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
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
