import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const kneelingSingleArmHighPulleyRow = {
  id: "019ebc77-8a3b-7497-8307-d75df0d808ba",
  type: "page-type/strength-exercise",
  slug: "kneeling-single-arm-high-pulley-row",
  title: "Kneeling Single-Arm High Pulley Row",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/cable",
  exerciseExternalId: "Kneeling_Single-Arm_High_Pulley_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kneeling_Single-Arm_High_Pulley_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Single-Arm_High_Pulley_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Single-Arm_High_Pulley_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
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
  createdAt: "2026-06-12T15:33:31.323Z",
  updatedAt: "2026-09-15T17:41:15.000Z",
} as const satisfies StrengthExercise
