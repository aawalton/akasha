import type { Exercise } from "../../exercise.page-type.ts"

export const weightedBallHyperextension = {
  id: "019ebc78-b50f-78a4-b525-12cc716845bc",
  pageTypeSlug: "exercise",
  slug: "weighted-ball-hyperextension",
  title: "Weighted Ball Hyperextension",
  exerciseCategory: "strength",
  equipment: "exercise-ball",
  exerciseExternalId: "Weighted_Ball_Hyperextension",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Weighted_Ball_Hyperextension",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Ball_Hyperextension/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Weighted_Ball_Hyperextension/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings", "middle-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
