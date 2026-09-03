import type { Exercise } from "../../exercise.page-type.ts"

export const kneeAcrossTheBody = {
  id: "019ebc77-872e-7403-9aa8-107aeb9f8c87",
  pageTypeSlug: "exercise",
  slug: "knee-across-the-body",
  title: "Knee Across The Body",
  exerciseCategory: "stretching",
  exerciseExternalId: "Knee_Across_The_Body",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Knee_Across_The_Body",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Knee_Across_The_Body/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Knee_Across_The_Body/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "time",
  secondaryMuscles: ["abductors", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
