import type { Exercise } from "../../exercise.page-type.ts"

export const standingInnerBicepsCurl = {
  id: "019ebc78-89a1-70b7-9f43-45f09920480e",
  pageTypeSlug: "exercise",
  slug: "standing-inner-biceps-curl",
  title: "Standing Inner-Biceps Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Standing_Inner-Biceps_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Inner-Biceps_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Inner-Biceps_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Inner-Biceps_Curl/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
