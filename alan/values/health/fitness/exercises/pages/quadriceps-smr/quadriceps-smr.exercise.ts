import type { Exercise } from "../../exercise.page-type.ts"

export const quadricepsSmr = {
  id: "019ebc77-c966-7356-b156-267fb0a6d84d",
  pageTypeSlug: "exercise",
  slug: "quadriceps-smr",
  title: "Quadriceps-SMR",
  exerciseCategory: "stretching",
  equipment: "foam-roll",
  exerciseExternalId: "Quadriceps-SMR",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Quadriceps-SMR",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Quadriceps-SMR/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Quadriceps-SMR/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
