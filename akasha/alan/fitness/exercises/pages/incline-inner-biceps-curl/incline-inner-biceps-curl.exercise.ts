import type { Exercise } from "../../exercise.page-type.ts"

export const inclineInnerBicepsCurl = {
  id: "019ebc77-7b41-7117-a197-2a7caefac4f5",
  pageTypeSlug: "exercise",
  slug: "incline-inner-biceps-curl",
  title: "Incline Inner Biceps Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Incline_Inner_Biceps_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Incline_Inner_Biceps_Curl",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Inner_Biceps_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Inner_Biceps_Curl/0.jpg",
  implementCount: 2,
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
} as const satisfies Exercise
