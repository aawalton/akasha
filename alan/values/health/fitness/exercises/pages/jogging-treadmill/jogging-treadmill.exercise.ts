import type { Exercise } from "../../exercise.page-type.ts"

export const joggingTreadmill = {
  id: "019ebc77-82ce-7dd5-850a-4c5e2ce2fdb8",
  pageTypeSlug: "exercise",
  slug: "jogging-treadmill",
  title: "Jogging, Treadmill",
  exerciseCategory: "cardio",
  equipment: "machine",
  exerciseExternalId: "Jogging_Treadmill",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Jogging_Treadmill",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Jogging_Treadmill/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Jogging_Treadmill/0.jpg",
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
  secondaryMuscles: ["glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
