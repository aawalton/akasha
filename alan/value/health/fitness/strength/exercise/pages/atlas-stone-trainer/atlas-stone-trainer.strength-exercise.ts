import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const atlasStoneTrainer = {
  id: "019ebc76-1a75-7968-a69c-8672de38e987",
  type: "page-type/strength-exercise",
  slug: "atlas-stone-trainer",
  title: "Atlas Stone Trainer",
  exerciseCategory: "strongman",
  equipment: "strength-exercise-implement/other",
  exerciseExternalId: "Atlas_Stone_Trainer",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Atlas_Stone_Trainer",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Atlas_Stone_Trainer/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Atlas_Stone_Trainer/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "forearms", "glutes", "hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:31:57.173Z",
  updatedAt: "2026-09-15T17:40:26.000Z",
} as const satisfies StrengthExercise
