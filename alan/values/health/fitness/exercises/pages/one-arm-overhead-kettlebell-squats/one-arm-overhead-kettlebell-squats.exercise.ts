import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmOverheadKettlebellSquats = {
  id: "019ebc77-b828-70d8-8cda-8009551c0bae",
  pageTypeSlug: "exercise",
  slug: "one-arm-overhead-kettlebell-squats",
  title: "One-Arm Overhead Kettlebell Squats",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "One-Arm_Overhead_Kettlebell_Squats",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Overhead_Kettlebell_Squats",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Overhead_Kettlebell_Squats/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Overhead_Kettlebell_Squats/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "expert",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
