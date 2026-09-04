import type { Exercise } from "../../exercise.page-type.ts"

export const ankleOnTheKnee = {
  id: "019ebc76-183c-7c97-9d5a-f6a2def08cdd",
  pageTypeSlug: "exercise",
  slug: "ankle-on-the-knee",
  title: "Ankle On The Knee",
  exerciseCategory: "stretching",
  exerciseExternalId: "Ankle_On_The_Knee",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Ankle_On_The_Knee",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ankle_On_The_Knee/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ankle_On_The_Knee/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
