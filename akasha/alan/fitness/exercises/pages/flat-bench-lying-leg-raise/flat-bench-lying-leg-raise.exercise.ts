import type { Exercise } from "../../exercise.page-type.ts"

export const flatBenchLyingLegRaise = {
  id: "019ebc77-3b0d-7435-b56f-79305a4f017c",
  pageTypeSlug: "exercise",
  slug: "flat-bench-lying-leg-raise",
  title: "Flat Bench Lying Leg Raise",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Flat_Bench_Lying_Leg_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Flat_Bench_Lying_Leg_Raise",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Lying_Leg_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Lying_Leg_Raise/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
