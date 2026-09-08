import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmFlatBenchDumbbellFlye = {
  id: "019ebc77-b390-7a8b-8488-e6ed84781b32",
  pageTypeSlug: "exercise",
  slug: "one-arm-flat-bench-dumbbell-flye",
  title: "One-Arm Flat Bench Dumbbell Flye",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "One-Arm_Flat_Bench_Dumbbell_Flye",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Flat_Bench_Dumbbell_Flye",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Flat_Bench_Dumbbell_Flye/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Flat_Bench_Dumbbell_Flye/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
