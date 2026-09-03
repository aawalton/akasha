import type { Exercise } from "../../exercise.page-type.ts"

export const oneLeggedCableKickback = {
  id: "019ebc77-b8da-7537-b9a3-c276f58d88dd",
  pageTypeSlug: "exercise",
  slug: "one-legged-cable-kickback",
  title: "One-Legged Cable Kickback",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "One-Legged_Cable_Kickback",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Legged_Cable_Kickback",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Legged_Cable_Kickback/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Legged_Cable_Kickback/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["hamstrings"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
