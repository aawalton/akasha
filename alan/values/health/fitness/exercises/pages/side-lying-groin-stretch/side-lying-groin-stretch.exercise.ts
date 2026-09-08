import type { Exercise } from "../../exercise.page-type.ts"

export const sideLyingGroinStretch = {
  id: "019ebc78-6361-711d-b3e4-c7971e36dcb6",
  pageTypeSlug: "exercise",
  slug: "side-lying-groin-stretch",
  title: "Side Lying Groin Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Side_Lying_Groin_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side_Lying_Groin_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lying_Groin_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lying_Groin_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "time",
  secondaryMuscles: ["hamstrings"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
