import type { Exercise } from "../../exercise.page-type.ts"

export const strideJumpCrossover = {
  id: "019ebc78-a565-7423-b10c-f812221c569b",
  pageTypeSlug: "exercise",
  slug: "stride-jump-crossover",
  title: "Stride Jump Crossover",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Stride_Jump_Crossover",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Stride_Jump_Crossover",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stride_Jump_Crossover/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stride_Jump_Crossover/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "adductors", "calves", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
