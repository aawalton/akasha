import type { Exercise } from "../../exercise.page-type.ts"

export const downwardFacingBalance = {
  id: "019ebc77-010a-7ba0-9ce5-209f536bd2b6",
  pageTypeSlug: "exercise",
  slug: "downward-facing-balance",
  title: "Downward Facing Balance",
  exerciseCategory: "strength",
  equipment: "exercise-ball",
  exerciseExternalId: "Downward_Facing_Balance",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Downward_Facing_Balance",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Downward_Facing_Balance/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Downward_Facing_Balance/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "hamstrings"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
