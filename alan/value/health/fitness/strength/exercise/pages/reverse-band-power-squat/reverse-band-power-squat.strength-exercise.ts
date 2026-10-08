import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const reverseBandPowerSquat = {
  id: "019ebc77-cc21-7335-8204-38908625f6ad",
  type: "page-type/strength-exercise",
  slug: "reverse-band-power-squat",
  title: "Reverse Band Power Squat",
  exerciseCategory: "powerlifting",
  equipment: "strength-exercise-implement/barbell",
  exerciseExternalId: "Reverse_Band_Power_Squat",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Reverse_Band_Power_Squat",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Band_Power_Squat/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Band_Power_Squat/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["adductors", "calves", "glutes", "hamstrings", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:48.193Z",
  updatedAt: "2026-09-15T17:41:15.000Z",
} as const satisfies StrengthExercise
