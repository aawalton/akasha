import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const twoArmKettlebellClean = {
  id: "019ebc78-add2-7f0e-b81e-afd3f8b66825",
  type: "page-type/strength-exercise",
  slug: "two-arm-kettlebell-clean",
  title: "Two-Arm Kettlebell Clean",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/kettlebells",
  exerciseExternalId: "Two-Arm_Kettlebell_Clean",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Two-Arm_Kettlebell_Clean",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Kettlebell_Clean/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Kettlebell_Clean/0.jpg",
  implementCount: 2,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings", "lower-back", "traps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:45.970Z",
  updatedAt: "2026-09-15T17:41:57.000Z",
} as const satisfies StrengthExercise
