import type { Exercise } from "../../exercise.page-type.ts"

export const shoulderRaise = {
  id: "019ebc78-6134-7035-ac2d-516cf410c46d",
  pageTypeSlug: "exercise",
  slug: "shoulder-raise",
  title: "Shoulder Raise",
  exerciseCategory: "stretching",
  exerciseExternalId: "Shoulder_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Shoulder_Raise",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Shoulder_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Shoulder_Raise/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "time",
  secondaryMuscles: ["lats"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
