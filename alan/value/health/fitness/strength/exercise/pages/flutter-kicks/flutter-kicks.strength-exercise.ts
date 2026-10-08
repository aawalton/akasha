import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const flutterKicks = {
  id: "019ebc77-3ee3-78b3-aad4-812d206ed81e",
  type: "page-type/strength-exercise",
  slug: "flutter-kicks",
  title: "Flutter Kicks",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/body-only",
  exerciseExternalId: "Flutter_Kicks",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Flutter_Kicks",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flutter_Kicks/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flutter_Kicks/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:12.035Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
