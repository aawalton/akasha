import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const ironCrossesStretch = {
  id: "019ebc77-801f-79f4-8c6f-59e767807dee",
  type: "page-type/strength-exercise",
  slug: "iron-crosses-stretch",
  title: "Iron Crosses (stretch)",
  exerciseCategory: "stretching",
  exerciseExternalId: "Iron_Crosses_stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Iron_Crosses_stretch",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Iron_Crosses_stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Iron_Crosses_stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:28.735Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
