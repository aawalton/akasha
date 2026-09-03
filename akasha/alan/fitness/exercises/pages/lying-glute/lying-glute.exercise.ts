import type { Exercise } from "../../exercise.page-type.ts"

export const lyingGlute = {
  id: "019ebc77-96f2-7cbf-8110-7e24ff6a15c4",
  pageTypeSlug: "exercise",
  slug: "lying-glute",
  title: "Lying Glute",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Lying_Glute",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Glute",
  force: "static",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Glute/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Glute/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "time",
  secondaryMuscles: ["abductors"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
