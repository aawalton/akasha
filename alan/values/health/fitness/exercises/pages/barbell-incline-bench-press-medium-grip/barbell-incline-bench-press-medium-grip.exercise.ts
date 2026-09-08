import type { Exercise } from "../../exercise.page-type.ts"

export const barbellInclineBenchPressMediumGrip = {
  id: "019ebc76-2396-7ca1-9a56-b4647dd30c8e",
  pageTypeSlug: "exercise",
  slug: "barbell-incline-bench-press-medium-grip",
  title: "Barbell Incline Bench Press - Medium Grip",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Incline_Bench_Press_-_Medium_Grip",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg",
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
