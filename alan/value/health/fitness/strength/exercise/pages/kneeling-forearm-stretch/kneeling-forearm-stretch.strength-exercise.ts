import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const kneelingForearmStretch = {
  id: "019ebc77-8946-7536-8fa7-3663e28e2876",
  type: "page-type/strength-exercise",
  slug: "kneeling-forearm-stretch",
  title: "Kneeling Forearm Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Kneeling_Forearm_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kneeling_Forearm_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Forearm_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Forearm_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["forearms"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:31.078Z",
  updatedAt: "2026-09-15T17:41:15.000Z",
} as const satisfies StrengthExercise
