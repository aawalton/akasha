import type { Exercise } from "../../exercise.page-type.ts"

export const inclineDumbbellBenchWithPalmsFacingIn = {
  id: "019ebc77-79d8-72ea-b61a-867abc55c8c5",
  pageTypeSlug: "exercise",
  slug: "incline-dumbbell-bench-with-palms-facing-in",
  title: "Incline Dumbbell Bench With Palms Facing In",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Incline_Dumbbell_Bench_With_Palms_Facing_In",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Incline_Dumbbell_Bench_With_Palms_Facing_In",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Bench_With_Palms_Facing_In/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Bench_With_Palms_Facing_In/0.jpg",
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
} as const satisfies Exercise
