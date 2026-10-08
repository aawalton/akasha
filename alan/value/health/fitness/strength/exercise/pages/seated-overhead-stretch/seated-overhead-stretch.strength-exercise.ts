import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const seatedOverheadStretch = {
  id: "019ebc78-5e52-7fc7-8b55-677ec92c6aad",
  type: "page-type/strength-exercise",
  slug: "seated-overhead-stretch",
  title: "Seated Overhead Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Seated_Overhead_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Overhead_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Overhead_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Overhead_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:25.618Z",
  updatedAt: "2026-09-15T17:41:38.000Z",
} as const satisfies StrengthExercise
