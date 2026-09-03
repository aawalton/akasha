import type { Exercise } from "../../exercise.page-type.ts"

export const chinToChestStretch = {
  id: "019ebc76-d053-7613-9722-0c3b02a92ab1",
  pageTypeSlug: "exercise",
  slug: "chin-to-chest-stretch",
  title: "Chin To Chest Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Chin_To_Chest_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Chin_To_Chest_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin_To_Chest_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chin_To_Chest_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "other",
  primaryMuscles: ["neck"],
  scoringMode: "time",
  secondaryMuscles: ["traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
