import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const kneeCircles = {
  id: "019ebc77-876f-750b-b1ec-08c63b355db9",
  type: "page-type/strength-exercise",
  slug: "knee-circles",
  title: "Knee Circles",
  exerciseCategory: "stretching",
  equipment: "strength-exercise-implement/body-only",
  exerciseExternalId: "Knee_Circles",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Knee_Circles",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Knee_Circles/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Knee_Circles/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "time",
  secondaryMuscles: ["hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:30.607Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
