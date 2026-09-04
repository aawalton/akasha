import type { Exercise } from "../../exercise.page-type.ts"

export const weightedSitUpsWithBands = {
  id: "019ebc78-b72d-78df-ba8d-d07315fedfa4",
  pageTypeSlug: "exercise",
  slug: "weighted-sit-ups-with-bands",
  title: "Weighted Sit-Ups - With Bands",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Weighted_Sit-Ups_-_With_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Weighted_Sit-Ups_-_With_Bands",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Sit-Ups_-_With_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Sit-Ups_-_With_Bands/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
