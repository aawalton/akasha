import type { Exercise } from "../../exercise.page-type.ts"

export const anteriorTibialisSmr = {
  id: "019ebc76-189c-74a8-bbe0-7fac833faac8",
  pageTypeSlug: "exercise",
  slug: "anterior-tibialis-smr",
  title: "Anterior Tibialis-SMR",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Anterior_Tibialis-SMR",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Anterior_Tibialis-SMR",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Anterior_Tibialis-SMR/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Anterior_Tibialis-SMR/0.jpg",
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
