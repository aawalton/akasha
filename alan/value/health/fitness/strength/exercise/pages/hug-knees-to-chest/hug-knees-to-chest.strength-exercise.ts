import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const hugKneesToChest = {
  id: "019ebc77-76ff-7491-b195-1306694016e0",
  type: "page-type/strength-exercise",
  slug: "hug-knees-to-chest",
  title: "Hug Knees To Chest",
  exerciseCategory: "stretching",
  exerciseExternalId: "Hug_Knees_To_Chest",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Hug_Knees_To_Chest",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hug_Knees_To_Chest/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hug_Knees_To_Chest/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "time",
  secondaryMuscles: ["glutes"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:26.399Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
