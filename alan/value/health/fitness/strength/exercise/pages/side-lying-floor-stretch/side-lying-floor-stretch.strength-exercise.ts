import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const sideLyingFloorStretch = {
  id: "019ebc78-61b1-7154-acdb-8106fbce0cb8",
  type: "page-type/strength-exercise",
  slug: "side-lying-floor-stretch",
  title: "Side-Lying Floor Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Side-Lying_Floor_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side-Lying_Floor_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side-Lying_Floor_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side-Lying_Floor_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:26.481Z",
  updatedAt: "2026-09-15T17:41:38.000Z",
} as const satisfies StrengthExercise
