import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const singleArmLinearJammer = {
  id: "019ebc78-651c-7e5b-a597-8ccfab2f946f",
  type: "page-type/strength-exercise",
  slug: "single-arm-linear-jammer",
  title: "Single-Arm Linear Jammer",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/barbell",
  exerciseExternalId: "Single-Arm_Linear_Jammer",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single-Arm_Linear_Jammer",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Arm_Linear_Jammer/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Arm_Linear_Jammer/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies StrengthExercise
