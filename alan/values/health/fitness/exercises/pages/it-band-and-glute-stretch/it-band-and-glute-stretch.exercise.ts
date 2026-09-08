import type { Exercise } from "../../exercise.page-type.ts"

export const itBandAndGluteStretch = {
  id: "019ebc77-783e-71e3-948c-4214d5848ab4",
  pageTypeSlug: "exercise",
  slug: "it-band-and-glute-stretch",
  title: "IT Band and Glute Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "IT_Band_and_Glute_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/IT_Band_and_Glute_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/IT_Band_and_Glute_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/IT_Band_and_Glute_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["abductors"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
