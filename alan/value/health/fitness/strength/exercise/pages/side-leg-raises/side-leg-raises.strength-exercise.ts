import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const sideLegRaises = {
  id: "019ebc78-631f-7a8c-af2a-a9bf9a4145cb",
  type: "page-type/strength-exercise",
  slug: "side-leg-raises",
  title: "Side Leg Raises",
  exerciseCategory: "stretching",
  equipment: "strength-exercise-implement/body-only",
  exerciseExternalId: "Side_Leg_Raises",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side_Leg_Raises",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Leg_Raises/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Leg_Raises/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:26.847Z",
  updatedAt: "2026-09-15T17:41:38.000Z",
} as const satisfies StrengthExercise
