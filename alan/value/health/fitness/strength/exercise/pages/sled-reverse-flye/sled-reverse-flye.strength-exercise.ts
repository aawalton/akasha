import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const sledReverseFlye = {
  id: "019ebc78-6a5e-7dda-b208-83578dad8743",
  type: "page-type/strength-exercise",
  slug: "sled-reverse-flye",
  title: "Sled Reverse Flye",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/other",
  exerciseExternalId: "Sled_Reverse_Flye",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Sled_Reverse_Flye",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Reverse_Flye/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Reverse_Flye/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "h-push",
  muscleFocus: "pull",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:28.702Z",
  updatedAt: "2026-09-15T17:41:38.000Z",
} as const satisfies StrengthExercise
