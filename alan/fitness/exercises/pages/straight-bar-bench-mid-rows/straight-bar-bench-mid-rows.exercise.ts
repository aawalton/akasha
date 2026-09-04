import type { Exercise } from "../../exercise.page-type.ts"

export const straightBarBenchMidRows = {
  id: "019ebc78-a4e5-7807-a5f3-8ee48f72494f",
  pageTypeSlug: "exercise",
  slug: "straight-bar-bench-mid-rows",
  title: "Straight Bar Bench Mid Rows",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Straight_Bar_Bench_Mid_Rows",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Straight_Bar_Bench_Mid_Rows",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight_Bar_Bench_Mid_Rows/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight_Bar_Bench_Mid_Rows/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
