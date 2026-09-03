import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmDumbbellBenchPress = {
  id: "019ebc77-b993-7300-a188-aaee15d16447",
  pageTypeSlug: "exercise",
  slug: "one-arm-dumbbell-bench-press",
  title: "One Arm Dumbbell Bench Press",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "One_Arm_Dumbbell_Bench_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One_Arm_Dumbbell_Bench_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Arm_Dumbbell_Bench_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Arm_Dumbbell_Bench_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
