import type { Exercise } from "../../exercise.page-type.ts"

export const chairLowerBackStretch = {
  id: "019ebc76-cd6f-76ea-acbb-be5a4dbf5b22",
  pageTypeSlug: "exercise",
  slug: "chair-lower-back-stretch",
  title: "Chair Lower Back Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Chair_Lower_Back_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Chair_Lower_Back_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chair_Lower_Back_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chair_Lower_Back_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "time",
  secondaryMuscles: ["lower-back"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
