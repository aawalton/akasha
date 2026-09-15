import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const singleLegStrideJump = {
  id: "019ebc78-66e4-7fd8-a480-fa6c604ebd8c",
  type: "page-type/strength-exercise",
  slug: "single-leg-stride-jump",
  title: "Single-Leg Stride Jump",
  exerciseCategory: "plyometrics",
  equipment: "strength-exercise-implement/other",
  exerciseExternalId: "Single-Leg_Stride_Jump",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single-Leg_Stride_Jump",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Leg_Stride_Jump/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Leg_Stride_Jump/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "adductors", "calves", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies StrengthExercise
