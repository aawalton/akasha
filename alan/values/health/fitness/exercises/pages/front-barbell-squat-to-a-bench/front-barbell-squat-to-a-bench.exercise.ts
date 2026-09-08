import type { Exercise } from "../../exercise.page-type.ts"

export const frontBarbellSquatToABench = {
  id: "019ebc77-410b-77e0-9a0c-a4772a6ae357",
  pageTypeSlug: "exercise",
  slug: "front-barbell-squat-to-a-bench",
  title: "Front Barbell Squat To A Bench",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Front_Barbell_Squat_To_A_Bench",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Front_Barbell_Squat_To_A_Bench",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Barbell_Squat_To_A_Bench/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Barbell_Squat_To_A_Bench/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
