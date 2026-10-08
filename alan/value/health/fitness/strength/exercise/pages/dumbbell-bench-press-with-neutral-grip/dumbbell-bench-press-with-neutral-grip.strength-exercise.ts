import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const dumbbellBenchPressWithNeutralGrip = {
  id: "019ebc77-0777-799e-ab1e-33efb76ac2b6",
  type: "page-type/strength-exercise",
  slug: "dumbbell-bench-press-with-neutral-grip",
  title: "Dumbbell Bench Press with Neutral Grip",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/dumbbell",
  exerciseExternalId: "Dumbbell_Bench_Press_with_Neutral_Grip",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Dumbbell_Bench_Press_with_Neutral_Grip",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press_with_Neutral_Grip/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bench_Press_with_Neutral_Grip/0.jpg",
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
  createdAt: "2026-06-12T15:32:57.847Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
