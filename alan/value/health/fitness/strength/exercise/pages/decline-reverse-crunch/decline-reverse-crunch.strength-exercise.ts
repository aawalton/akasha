import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const declineReverseCrunch = {
  id: "019ebc76-f062-7360-9601-aea2f20144d1",
  type: "page-type/strength-exercise",
  slug: "decline-reverse-crunch",
  title: "Decline Reverse Crunch",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/body-only",
  exerciseExternalId: "Decline_Reverse_Crunch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Decline_Reverse_Crunch",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Reverse_Crunch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Reverse_Crunch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:32:51.938Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
