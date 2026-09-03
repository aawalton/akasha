import type { Exercise } from "../../exercise.page-type.ts"

export const behindHeadChestStretch = {
  id: "019ebc76-9e18-75b9-8d38-53ab9b2b36a0",
  pageTypeSlug: "exercise",
  slug: "behind-head-chest-stretch",
  title: "Behind Head Chest Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Behind_Head_Chest_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Behind_Head_Chest_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Behind_Head_Chest_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Behind_Head_Chest_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "time",
  secondaryMuscles: ["shoulders"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
