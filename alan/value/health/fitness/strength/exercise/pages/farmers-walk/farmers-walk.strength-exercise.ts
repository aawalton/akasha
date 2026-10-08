import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const farmersWalk = {
  id: "019ebc77-38be-7ad2-9090-8842e93e36bd",
  type: "page-type/strength-exercise",
  slug: "farmers-walk",
  title: "Farmer's Walk",
  exerciseCategory: "strongman",
  equipment: "strength-exercise-implement/other",
  exerciseExternalId: "Farmers_Walk",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Farmers_Walk",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "carry",
  muscleFocus: "pull",
  primaryMuscles: ["forearms"],
  scoringMode: "time",
  secondaryMuscles: ["abdominals", "glutes", "hamstrings", "lower-back", "quadriceps", "traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:10.462Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
