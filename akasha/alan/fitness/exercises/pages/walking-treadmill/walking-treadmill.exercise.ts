import type { Exercise } from "../../exercise.page-type.ts"

export const walkingTreadmill = {
  id: "019ebc78-b45f-781a-aebf-78dcbe741991",
  pageTypeSlug: "exercise",
  slug: "walking-treadmill",
  title: "Walking, Treadmill",
  exerciseCategory: "cardio",
  equipment: "machine",
  exerciseExternalId: "Walking_Treadmill",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Walking_Treadmill",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Walking_Treadmill/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Walking_Treadmill/0.jpg",
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
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
