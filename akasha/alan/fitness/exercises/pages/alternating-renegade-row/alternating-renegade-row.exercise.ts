import type { Exercise } from "../../exercise.page-type.ts"

export const alternatingRenegadeRow = {
  id: "019ebc75-c270-712a-bd8e-5edf901e9681",
  pageTypeSlug: "exercise",
  slug: "alternating-renegade-row",
  title: "Alternating Renegade Row",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Alternating_Renegade_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Alternating_Renegade_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Renegade_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Renegade_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "alternating",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "biceps", "chest", "lats", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
