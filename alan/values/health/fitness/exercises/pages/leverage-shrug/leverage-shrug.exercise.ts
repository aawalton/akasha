import type { Exercise } from "../../exercise.page-type.ts"

export const leverageShrug = {
  id: "019ebc77-8fbb-7815-9efd-6e9d23ee9a8d",
  pageTypeSlug: "exercise",
  slug: "leverage-shrug",
  title: "Leverage Shrug",
  exerciseCategory: "strength",
  equipment: "machine",
  exerciseExternalId: "Leverage_Shrug",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Leverage_Shrug",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leverage_Shrug/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leverage_Shrug/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["traps"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
