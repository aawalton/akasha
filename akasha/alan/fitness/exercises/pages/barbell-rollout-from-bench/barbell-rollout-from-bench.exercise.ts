import type { Exercise } from "../../exercise.page-type.ts"

export const barbellRolloutFromBench = {
  id: "019ebc76-972e-7f36-bdec-43cb5efac7a2",
  pageTypeSlug: "exercise",
  slug: "barbell-rollout-from-bench",
  title: "Barbell Rollout from Bench",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Rollout_from_Bench",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Rollout_from_Bench",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Rollout_from_Bench/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Rollout_from_Bench/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "core-anti-extension",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings", "lats", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
