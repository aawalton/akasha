import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const walkingTreadmill = {
  id: "019ebc78-b45f-781a-aebf-78dcbe741991",
  type: "page-type/strength-exercise",
  slug: "walking-treadmill",
  title: "Walking, Treadmill",
  exerciseCategory: "cardio",
  equipment: "strength-exercise-implement/machine",
  exerciseExternalId: "Walking_Treadmill",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Walking_Treadmill",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Walking_Treadmill/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Walking_Treadmill/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "conditioning",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:47.647Z",
  updatedAt: "2026-09-15T17:41:57.000Z",
} as const satisfies StrengthExercise
