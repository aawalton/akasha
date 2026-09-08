import type { Exercise } from "../../exercise.page-type.ts"

export const barbellBenchPressMediumGrip = {
  id: "019ebc76-2122-7de4-a22f-e23bc3236b5c",
  pageTypeSlug: "exercise",
  slug: "barbell-bench-press-medium-grip",
  title: "Barbell Bench Press - Medium Grip",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Bench_Press_-_Medium_Grip",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Bench_Press_-_Medium_Grip",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Bench_Press_-_Medium_Grip/0.jpg",
  implementCount: 1,
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
