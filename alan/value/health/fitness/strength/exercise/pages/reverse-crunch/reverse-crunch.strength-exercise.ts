import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const reverseCrunch = {
  id: "019ebc77-cd71-7d2b-a1c4-61d73bf62515",
  type: "page-type/strength-exercise",
  slug: "reverse-crunch",
  title: "Reverse Crunch",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/body-only",
  exerciseExternalId: "Reverse_Crunch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Reverse_Crunch",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Crunch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Crunch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:48.529Z",
  updatedAt: "2026-09-15T17:41:15.000Z",
} as const satisfies StrengthExercise
