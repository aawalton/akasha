import type { Exercise } from "../../exercise.page-type.ts"

export const lyingProneQuadriceps = {
  id: "019ebc77-9874-7e2c-9413-7a2fefe66bfe",
  pageTypeSlug: "exercise",
  slug: "lying-prone-quadriceps",
  title: "Lying Prone Quadriceps",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Lying_Prone_Quadriceps",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Prone_Quadriceps",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Prone_Quadriceps/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Prone_Quadriceps/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
