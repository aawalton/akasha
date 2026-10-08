import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const declineDumbbellBenchPress = {
  id: "019ebc76-eeec-77e4-92d3-b77b636ea693",
  type: "page-type/strength-exercise",
  slug: "decline-dumbbell-bench-press",
  title: "Decline Dumbbell Bench Press",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/dumbbell",
  exerciseExternalId: "Decline_Dumbbell_Bench_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Decline_Dumbbell_Bench_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Dumbbell_Bench_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Dumbbell_Bench_Press/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
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
  createdAt: "2026-06-12T15:32:51.564Z",
  updatedAt: "2026-09-15T17:40:26.000Z",
} as const satisfies StrengthExercise
