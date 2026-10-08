import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const elevatedBackLunge = {
  id: "019ebc77-2e8d-7595-b9eb-887f5df5ec39",
  type: "page-type/strength-exercise",
  slug: "elevated-back-lunge",
  title: "Elevated Back Lunge",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/barbell",
  exerciseExternalId: "Elevated_Back_Lunge",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Elevated_Back_Lunge",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elevated_Back_Lunge/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elevated_Back_Lunge/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "lunge",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:07.853Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
