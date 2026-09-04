import type { Exercise } from "../../exercise.page-type.ts"

export const footSmr = {
  id: "019ebc77-3f2a-795c-b36b-0497be3edda3",
  pageTypeSlug: "exercise",
  slug: "foot-smr",
  title: "Foot-SMR",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Foot-SMR",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Foot-SMR",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Foot-SMR/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Foot-SMR/0.jpg",
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
