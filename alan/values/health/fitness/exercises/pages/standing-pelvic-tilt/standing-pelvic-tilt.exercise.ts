import type { Exercise } from "../../exercise.page-type.ts"

export const standingPelvicTilt = {
  id: "019ebc78-a0d6-725f-84a6-f9923e43b07d",
  pageTypeSlug: "exercise",
  slug: "standing-pelvic-tilt",
  title: "Standing Pelvic Tilt",
  exerciseCategory: "stretching",
  exerciseExternalId: "Standing_Pelvic_Tilt",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Pelvic_Tilt",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Pelvic_Tilt/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Pelvic_Tilt/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "time",
  secondaryMuscles: ["glutes"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
