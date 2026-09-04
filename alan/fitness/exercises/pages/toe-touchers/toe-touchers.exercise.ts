import type { Exercise } from "../../exercise.page-type.ts"

export const toeTouchers = {
  id: "019ebc78-aa8e-76fa-8473-8f668fbe4e45",
  pageTypeSlug: "exercise",
  slug: "toe-touchers",
  title: "Toe Touchers",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Toe_Touchers",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Toe_Touchers",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Toe_Touchers/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Toe_Touchers/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
