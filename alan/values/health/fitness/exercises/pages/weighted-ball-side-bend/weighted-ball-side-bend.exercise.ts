import type { Exercise } from "../../exercise.page-type.ts"

export const weightedBallSideBend = {
  id: "019ebc78-b554-78f4-9eaa-9e06d5fd7b66",
  pageTypeSlug: "exercise",
  slug: "weighted-ball-side-bend",
  title: "Weighted Ball Side Bend",
  exerciseCategory: "strength",
  equipment: "exercise-ball",
  exerciseExternalId: "Weighted_Ball_Side_Bend",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Weighted_Ball_Side_Bend",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Ball_Side_Bend/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Ball_Side_Bend/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-lateral-flexion",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
