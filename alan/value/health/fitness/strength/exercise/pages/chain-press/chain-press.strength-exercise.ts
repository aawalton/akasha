import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const chainPress = {
  id: "019ebc76-cceb-7bb4-a21d-2b067f68bd83",
  type: "page-type/strength-exercise",
  slug: "chain-press",
  title: "Chain Press",
  exerciseCategory: "powerlifting",
  equipment: "strength-exercise-implement/other",
  exerciseExternalId: "Chain_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Chain_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chain_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chain_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:32:42.859Z",
  updatedAt: "2026-09-15T17:40:26.000Z",
} as const satisfies StrengthExercise
