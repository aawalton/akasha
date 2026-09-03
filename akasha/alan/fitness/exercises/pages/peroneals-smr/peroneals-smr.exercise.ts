import type { Exercise } from "../../exercise.page-type.ts"

export const peronealsSmr = {
  id: "019ebc77-bff8-7680-a81a-e0e2431a4544",
  pageTypeSlug: "exercise",
  slug: "peroneals-smr",
  title: "Peroneals-SMR",
  exerciseCategory: "stretching",
  equipment: "foam-roll",
  exerciseExternalId: "Peroneals-SMR",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Peroneals-SMR",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Peroneals-SMR/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Peroneals-SMR/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
