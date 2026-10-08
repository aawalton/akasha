import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const dancersStretch = {
  id: "019ebc76-e196-7d1a-85a4-aa98b30955a8",
  type: "page-type/strength-exercise",
  slug: "dancers-stretch",
  title: "Dancer's Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Dancers_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Dancers_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dancers_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dancers_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "time",
  secondaryMuscles: ["abductors", "glutes"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:32:48.150Z",
  updatedAt: "2026-09-15T17:40:26.000Z",
} as const satisfies StrengthExercise
