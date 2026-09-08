import type { Exercise } from "../../exercise.page-type.ts"

export const seatedFlatBenchLegPullIn = {
  id: "019ebc78-5790-7013-9810-89fe148fd9eb",
  pageTypeSlug: "exercise",
  slug: "seated-flat-bench-leg-pull-in",
  title: "Seated Flat Bench Leg Pull-In",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Seated_Flat_Bench_Leg_Pull-In",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Flat_Bench_Leg_Pull-In",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Flat_Bench_Leg_Pull-In/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Flat_Bench_Leg_Pull-In/0.jpg",
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
