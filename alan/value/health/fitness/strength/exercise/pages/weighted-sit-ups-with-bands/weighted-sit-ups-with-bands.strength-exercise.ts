import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const weightedSitUpsWithBands = {
  id: "019ebc78-b72d-78df-ba8d-d07315fedfa4",
  type: "page-type/strength-exercise",
  slug: "weighted-sit-ups-with-bands",
  title: "Weighted Sit-Ups - With Bands",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/other",
  exerciseExternalId: "Weighted_Sit-Ups_-_With_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Weighted_Sit-Ups_-_With_Bands",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Sit-Ups_-_With_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Sit-Ups_-_With_Bands/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
  createdAt: "2026-06-12T15:34:48.365Z",
  updatedAt: "2026-09-15T17:41:57.000Z",
} as const satisfies StrengthExercise
