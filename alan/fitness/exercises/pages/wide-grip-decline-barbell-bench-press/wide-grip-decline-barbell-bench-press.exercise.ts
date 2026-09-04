import type { Exercise } from "../../exercise.page-type.ts"

export const wideGripDeclineBarbellBenchPress = {
  id: "019ebc78-b7e4-7c6e-a8f8-a41e9f3a097b",
  pageTypeSlug: "exercise",
  slug: "wide-grip-decline-barbell-bench-press",
  title: "Wide-Grip Decline Barbell Bench Press",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Wide-Grip_Decline_Barbell_Bench_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Wide-Grip_Decline_Barbell_Bench_Press",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Decline_Barbell_Bench_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Decline_Barbell_Bench_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
