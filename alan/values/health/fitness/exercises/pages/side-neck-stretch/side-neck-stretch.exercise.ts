import type { Exercise } from "../../exercise.page-type.ts"

export const sideNeckStretch = {
  id: "019ebc78-639e-7cc2-a8cb-8c947d9e9782",
  pageTypeSlug: "exercise",
  slug: "side-neck-stretch",
  title: "Side Neck Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Side_Neck_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side_Neck_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Neck_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Neck_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "other",
  primaryMuscles: ["neck"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
