import type { Exercise } from "../../exercise.page-type.ts"

export const dynamicChestStretch = {
  id: "019ebc77-2c74-7e34-a229-fa89068d277f",
  pageTypeSlug: "exercise",
  slug: "dynamic-chest-stretch",
  title: "Dynamic Chest Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Dynamic_Chest_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Dynamic_Chest_Stretch",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dynamic_Chest_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dynamic_Chest_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "time",
  secondaryMuscles: ["middle-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
