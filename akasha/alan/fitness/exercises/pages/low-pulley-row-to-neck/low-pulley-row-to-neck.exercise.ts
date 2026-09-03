import type { Exercise } from "../../exercise.page-type.ts"

export const lowPulleyRowToNeck = {
  id: "019ebc77-91d2-7897-8668-fa54b4800448",
  pageTypeSlug: "exercise",
  slug: "low-pulley-row-to-neck",
  title: "Low Pulley Row To Neck",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Low_Pulley_Row_To_Neck",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Low_Pulley_Row_To_Neck",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Pulley_Row_To_Neck/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Low_Pulley_Row_To_Neck/0.jpg",
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
  secondaryMuscles: ["biceps", "middle-back", "traps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
