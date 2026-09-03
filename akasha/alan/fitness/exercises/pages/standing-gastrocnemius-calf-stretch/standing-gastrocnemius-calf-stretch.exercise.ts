import type { Exercise } from "../../exercise.page-type.ts"

export const standingGastrocnemiusCalfStretch = {
  id: "019ebc78-8843-7365-b7ab-d64bfad32786",
  pageTypeSlug: "exercise",
  slug: "standing-gastrocnemius-calf-stretch",
  title: "Standing Gastrocnemius Calf Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Standing_Gastrocnemius_Calf_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Gastrocnemius_Calf_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Gastrocnemius_Calf_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Gastrocnemius_Calf_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "time",
  secondaryMuscles: ["hamstrings"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
