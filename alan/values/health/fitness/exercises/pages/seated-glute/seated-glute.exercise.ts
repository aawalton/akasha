import type { Exercise } from "../../exercise.page-type.ts"

export const seatedGlute = {
  id: "019ebc78-585d-7501-ba48-fb391609d0ff",
  pageTypeSlug: "exercise",
  slug: "seated-glute",
  title: "Seated Glute",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Seated_Glute",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Glute",
  force: "static",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Glute/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Glute/0.jpg",
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
  secondaryMuscles: ["adductors"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
