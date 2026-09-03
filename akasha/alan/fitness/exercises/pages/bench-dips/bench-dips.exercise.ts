import type { Exercise } from "../../exercise.page-type.ts"

export const benchDips = {
  id: "019ebc76-9e56-7e05-a26c-92208323c0f3",
  pageTypeSlug: "exercise",
  slug: "bench-dips",
  title: "Bench Dips",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Bench_Dips",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bench_Dips",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bench_Dips/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.45,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
