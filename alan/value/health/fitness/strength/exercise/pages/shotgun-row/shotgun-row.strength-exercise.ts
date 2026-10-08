import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const shotgunRow = {
  id: "019ebc78-6062-7947-8c77-bf2f8d9eb893",
  type: "page-type/strength-exercise",
  slug: "shotgun-row",
  title: "Shotgun Row",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/cable",
  exerciseExternalId: "Shotgun_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Shotgun_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Shotgun_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Shotgun_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "middle-back"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:26.146Z",
  updatedAt: "2026-09-15T17:41:38.000Z",
} as const satisfies StrengthExercise
