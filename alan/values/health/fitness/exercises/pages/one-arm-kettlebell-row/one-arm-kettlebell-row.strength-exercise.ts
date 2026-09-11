import type { StrengthExercise } from "akasha/alan/values/health/fitness/exercises/strength-exercise.page-type.types.ts"

export const oneArmKettlebellRow = {
  id: "019ebc77-b60b-7a9c-be01-b91e542d37bc",
  type: "strength-exercise",
  slug: "one-arm-kettlebell-row",
  title: "One-Arm Kettlebell Row",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "One-Arm_Kettlebell_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Kettlebell_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies StrengthExercise
