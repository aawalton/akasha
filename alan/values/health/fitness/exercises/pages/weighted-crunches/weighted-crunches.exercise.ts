import type { Exercise } from "../../exercise.page-type.ts"

export const weightedCrunches = {
  id: "019ebc78-b639-7b4c-9d5f-31528e8a086e",
  pageTypeSlug: "exercise",
  slug: "weighted-crunches",
  title: "Weighted Crunches",
  exerciseCategory: "strength",
  equipment: "medicine-ball",
  exerciseExternalId: "Weighted_Crunches",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Weighted_Crunches",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Crunches/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Crunches/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
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
