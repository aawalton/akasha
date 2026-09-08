import type { Exercise } from "../../exercise.page-type.ts"

export const suspendedFallout = {
  id: "019ebc78-a782-78d7-acff-ab3f703fefd1",
  pageTypeSlug: "exercise",
  slug: "suspended-fallout",
  title: "Suspended Fallout",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Suspended_Fallout",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Suspended_Fallout",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Suspended_Fallout/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Suspended_Fallout/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-extension",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "lower-back", "shoulders"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
