import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const squatJerk = {
  id: "019ebc78-7fc9-7697-956c-36bbe5b60e60",
  type: "page-type/strength-exercise",
  slug: "squat-jerk",
  title: "Squat Jerk",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/barbell",
  exerciseExternalId: "Squat_Jerk",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Squat_Jerk",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Squat_Jerk/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Squat_Jerk/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings", "shoulders", "triceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:34.185Z",
  updatedAt: "2026-09-15T17:41:38.000Z",
} as const satisfies StrengthExercise
