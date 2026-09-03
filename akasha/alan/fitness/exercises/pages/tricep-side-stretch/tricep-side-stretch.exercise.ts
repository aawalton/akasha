import type { Exercise } from "../../exercise.page-type.ts"

export const tricepSideStretch = {
  id: "019ebc78-abb8-7ccb-a105-5be0cd82385c",
  pageTypeSlug: "exercise",
  slug: "tricep-side-stretch",
  title: "Tricep Side Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Tricep_Side_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Tricep_Side_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tricep_Side_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tricep_Side_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "time",
  secondaryMuscles: ["shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
