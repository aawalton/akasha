import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const barbellCurlsLyingAgainstAnIncline = {
  id: "019ebc76-21b3-7dfb-a953-69d6d1754169",
  type: "page-type/strength-exercise",
  slug: "barbell-curls-lying-against-an-incline",
  title: "Barbell Curls Lying Against An Incline",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/barbell",
  exerciseExternalId: "Barbell_Curls_Lying_Against_An_Incline",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Curls_Lying_Against_An_Incline",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curls_Lying_Against_An_Incline/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curls_Lying_Against_An_Incline/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:31:59.027Z",
  updatedAt: "2026-09-15T17:40:26.000Z",
} as const satisfies StrengthExercise
