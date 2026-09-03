import type { Exercise } from "../../exercise.page-type.ts"

export const flatBenchLegPullIn = {
  id: "019ebc77-39c6-738a-91f3-c4d4b124c185",
  pageTypeSlug: "exercise",
  slug: "flat-bench-leg-pull-in",
  title: "Flat Bench Leg Pull-In",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Flat_Bench_Leg_Pull-In",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Flat_Bench_Leg_Pull-In",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Leg_Pull-In/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Leg_Pull-In/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
