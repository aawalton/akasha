import type { Exercise } from "../../exercise.page-type.ts"

export const neckSmr = {
  id: "019ebc77-b190-7f7d-9051-ff904827e9f0",
  pageTypeSlug: "exercise",
  slug: "neck-smr",
  title: "Neck-SMR",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Neck-SMR",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Neck-SMR",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Neck-SMR/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Neck-SMR/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "other",
  primaryMuscles: ["neck"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
