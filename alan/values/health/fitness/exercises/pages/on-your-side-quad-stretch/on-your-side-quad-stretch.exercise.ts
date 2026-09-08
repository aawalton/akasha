import type { Exercise } from "../../exercise.page-type.ts"

export const onYourSideQuadStretch = {
  id: "019ebc77-b306-72b1-826b-e5f00ee0084c",
  pageTypeSlug: "exercise",
  slug: "on-your-side-quad-stretch",
  title: "On Your Side Quad Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "On_Your_Side_Quad_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/On_Your_Side_Quad_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/On_Your_Side_Quad_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/On_Your_Side_Quad_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
