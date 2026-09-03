import type { Exercise } from "../../exercise.page-type.ts"

export const balanceBoard = {
  id: "019ebc76-1e34-721d-aa2a-2bf8f86cd240",
  pageTypeSlug: "exercise",
  slug: "balance-board",
  title: "Balance Board",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Balance_Board",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Balance_Board",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Balance_Board/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Balance_Board/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "reps",
  secondaryMuscles: ["hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
