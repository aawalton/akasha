import type { Exercise } from "../../exercise.page-type.ts"

export const spinalStretch = {
  id: "019ebc78-7dfd-7d29-89ce-991eaa26f499",
  pageTypeSlug: "exercise",
  slug: "spinal-stretch",
  title: "Spinal Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Spinal_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Spinal_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Spinal_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Spinal_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "time",
  secondaryMuscles: ["lats", "lower-back", "neck", "traps"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
