import type { Exercise } from "../../exercise.page-type.ts"

export const oneKneeToChest = {
  id: "019ebc77-bb88-7ec3-a8f8-5d35e29200ae",
  pageTypeSlug: "exercise",
  slug: "one-knee-to-chest",
  title: "One Knee To Chest",
  exerciseCategory: "stretching",
  exerciseExternalId: "One_Knee_To_Chest",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One_Knee_To_Chest",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Knee_To_Chest/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Knee_To_Chest/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "time",
  secondaryMuscles: ["hamstrings", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
