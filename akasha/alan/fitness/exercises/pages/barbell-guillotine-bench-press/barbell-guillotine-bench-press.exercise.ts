import type { Exercise } from "../../exercise.page-type.ts"

export const barbellGuillotineBenchPress = {
  id: "019ebc76-22c0-7bab-858f-16c62e37fdd0",
  pageTypeSlug: "exercise",
  slug: "barbell-guillotine-bench-press",
  title: "Barbell Guillotine Bench Press",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Guillotine_Bench_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Guillotine_Bench_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Guillotine_Bench_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Guillotine_Bench_Press/0.jpg",
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
