import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const kettlebellHangClean = {
  id: "019ebc77-83fc-775e-afdf-b97f13e7ed65",
  type: "page-type/strength-exercise",
  slug: "kettlebell-hang-clean",
  title: "Kettlebell Hang Clean",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/kettlebells",
  exerciseExternalId: "Kettlebell_Hang_Clean",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kettlebell_Hang_Clean",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Hang_Clean/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Hang_Clean/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "lower-back", "shoulders", "traps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:29.724Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
