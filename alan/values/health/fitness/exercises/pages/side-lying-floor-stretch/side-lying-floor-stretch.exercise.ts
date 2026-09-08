import type { Exercise } from "../../exercise.page-type.ts"

export const sideLyingFloorStretch = {
  id: "019ebc78-61b1-7154-acdb-8106fbce0cb8",
  pageTypeSlug: "exercise",
  slug: "side-lying-floor-stretch",
  title: "Side-Lying Floor Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Side-Lying_Floor_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side-Lying_Floor_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side-Lying_Floor_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side-Lying_Floor_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
