import type { Exercise } from "../../exercise.page-type.ts"

export const cableRopeRearDeltRows = {
  id: "019ebc76-c388-7290-85f3-a873c7d66708",
  pageTypeSlug: "exercise",
  slug: "cable-rope-rear-delt-rows",
  title: "Cable Rope Rear-Delt Rows",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Cable_Rope_Rear-Delt_Rows",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Cable_Rope_Rear-Delt_Rows",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Rear-Delt_Rows/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Rope_Rear-Delt_Rows/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "middle-back"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
