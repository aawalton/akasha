import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const elbowsBack = {
  id: "019ebc77-2e4c-77db-a870-3dd135dc4ddf",
  type: "page-type/strength-exercise",
  slug: "elbows-back",
  title: "Elbows Back",
  exerciseCategory: "stretching",
  exerciseExternalId: "Elbows_Back",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Elbows_Back",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elbows_Back/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elbows_Back/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "time",
  secondaryMuscles: ["shoulders"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:07.788Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
