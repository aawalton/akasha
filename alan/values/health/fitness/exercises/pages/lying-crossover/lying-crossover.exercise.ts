import type { Exercise } from "../../exercise.page-type.ts"

export const lyingCrossover = {
  id: "019ebc77-95fe-7984-b78a-6775604d5b18",
  pageTypeSlug: "exercise",
  slug: "lying-crossover",
  title: "Lying Crossover",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Lying_Crossover",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Crossover",
  force: "static",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Crossover/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Crossover/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
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
