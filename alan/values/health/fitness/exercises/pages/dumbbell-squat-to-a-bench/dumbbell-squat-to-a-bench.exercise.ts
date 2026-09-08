import type { Exercise } from "../../exercise.page-type.ts"

export const dumbbellSquatToABench = {
  id: "019ebc77-2b31-7f5c-8c64-0a0d5a63c30f",
  pageTypeSlug: "exercise",
  slug: "dumbbell-squat-to-a-bench",
  title: "Dumbbell Squat To A Bench",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Dumbbell_Squat_To_A_Bench",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Dumbbell_Squat_To_A_Bench",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Squat_To_A_Bench/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Squat_To_A_Bench/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
