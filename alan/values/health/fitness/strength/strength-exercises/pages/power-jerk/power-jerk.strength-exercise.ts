import type { StrengthExercise } from "akasha/alan/values/health/fitness/strength/strength-exercises/strength-exercise.page-type.types.ts"

export const powerJerk = {
  id: "019ebc77-c39d-7705-9ea5-3edea1f92b3d",
  type: "strength-exercise",
  slug: "power-jerk",
  title: "Power Jerk",
  exerciseCategory: "olympic-weightlifting",
  equipment: "barbell",
  exerciseExternalId: "Power_Jerk",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Power_Jerk",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Power_Jerk/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Power_Jerk/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "calves", "glutes", "hamstrings", "shoulders", "triceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies StrengthExercise
