import type { Exercise } from "../../exercise.page-type.ts"

export const intermediateHipFlexorAndQuadStretch = {
  id: "019ebc77-7ee6-7704-94fb-536a10aab2bd",
  pageTypeSlug: "exercise",
  slug: "intermediate-hip-flexor-and-quad-stretch",
  title: "Intermediate Hip Flexor and Quad Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Intermediate_Hip_Flexor_and_Quad_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Intermediate_Hip_Flexor_and_Quad_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Intermediate_Hip_Flexor_and_Quad_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Intermediate_Hip_Flexor_and_Quad_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
