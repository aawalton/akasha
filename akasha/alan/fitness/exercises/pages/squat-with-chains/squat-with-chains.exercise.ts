import type { Exercise } from "../../exercise.page-type.ts"

export const squatWithChains = {
  id: "019ebc78-803c-7bf7-9a2a-6aaba1ea2406",
  pageTypeSlug: "exercise",
  slug: "squat-with-chains",
  title: "Squat with Chains",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Squat_with_Chains",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Squat_with_Chains",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Squat_with_Chains/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Squat_with_Chains/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["adductors", "calves", "glutes", "hamstrings", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
