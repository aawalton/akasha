import type { Exercise } from "../../exercise.page-type.ts"

export const intermediateGroinStretch = {
  id: "019ebc77-7ea7-7d09-b8e0-4e118f8810f5",
  pageTypeSlug: "exercise",
  slug: "intermediate-groin-stretch",
  title: "Intermediate Groin Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Intermediate_Groin_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Intermediate_Groin_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Intermediate_Groin_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Intermediate_Groin_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
