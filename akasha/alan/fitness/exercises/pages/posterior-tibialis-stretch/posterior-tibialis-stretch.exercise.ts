import type { Exercise } from "../../exercise.page-type.ts"

export const posteriorTibialisStretch = {
  id: "019ebc77-c2e3-7244-8d6c-fa5f0d428a3c",
  pageTypeSlug: "exercise",
  slug: "posterior-tibialis-stretch",
  title: "Posterior Tibialis Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Posterior_Tibialis_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Posterior_Tibialis_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Posterior_Tibialis_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Posterior_Tibialis_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
