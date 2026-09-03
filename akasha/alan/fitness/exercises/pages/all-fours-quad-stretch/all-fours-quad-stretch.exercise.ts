import type { Exercise } from "../../exercise.page-type.ts"

export const allFoursQuadStretch = {
  id: "019ebc75-bfa2-75e7-a561-c446de107afc",
  pageTypeSlug: "exercise",
  slug: "all-fours-quad-stretch",
  title: "All Fours Quad Stretch",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "All_Fours_Quad_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/All_Fours_Quad_Stretch",
  force: "static",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/All_Fours_Quad_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/All_Fours_Quad_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  secondaryMuscles: ["quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
