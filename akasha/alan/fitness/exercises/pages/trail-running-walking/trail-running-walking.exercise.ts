import type { Exercise } from "../../exercise.page-type.ts"

export const trailRunningWalking = {
  id: "019ebc78-ab00-7f28-ba94-a656a15cbb2f",
  pageTypeSlug: "exercise",
  slug: "trail-running-walking",
  title: "Trail Running/Walking",
  exerciseCategory: "cardio",
  exerciseExternalId: "Trail_Running_Walking",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Trail_Running_Walking",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Trail_Running_Walking/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Trail_Running_Walking/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "conditioning",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
