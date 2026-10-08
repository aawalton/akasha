import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const seatedFloorHamstringStretch = {
  id: "019ebc78-57cb-7b40-8846-9cb9d097df93",
  type: "page-type/strength-exercise",
  slug: "seated-floor-hamstring-stretch",
  title: "Seated Floor Hamstring Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Seated_Floor_Hamstring_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Floor_Hamstring_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Floor_Hamstring_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Floor_Hamstring_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  secondaryMuscles: ["calves"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:23.947Z",
  updatedAt: "2026-09-15T17:41:38.000Z",
} as const satisfies StrengthExercise
