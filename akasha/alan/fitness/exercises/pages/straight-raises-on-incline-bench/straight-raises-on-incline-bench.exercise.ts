import type { Exercise } from "../../exercise.page-type.ts"

export const straightRaisesOnInclineBench = {
  id: "019ebc78-a522-7884-b8fa-b785b0de48a1",
  pageTypeSlug: "exercise",
  slug: "straight-raises-on-incline-bench",
  title: "Straight Raises on Incline Bench",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Straight_Raises_on_Incline_Bench",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Straight_Raises_on_Incline_Bench",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight_Raises_on_Incline_Bench/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight_Raises_on_Incline_Bench/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["traps"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
