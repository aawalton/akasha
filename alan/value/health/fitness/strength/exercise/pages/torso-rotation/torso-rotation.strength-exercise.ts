import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const torsoRotation = {
  id: "019ebc78-aac7-7795-aa3c-e0c14970a013",
  type: "page-type/strength-exercise",
  slug: "torso-rotation",
  title: "Torso Rotation",
  exerciseCategory: "stretching",
  equipment: "strength-exercise-implement/exercise-ball",
  exerciseExternalId: "Torso_Rotation",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Torso_Rotation",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Torso_Rotation/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Torso_Rotation/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:45.191Z",
  updatedAt: "2026-09-15T17:41:57.000Z",
} as const satisfies StrengthExercise
