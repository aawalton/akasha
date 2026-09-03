import type { Exercise } from "../../exercise.page-type.ts"

export const tricepsPushdown = {
  id: "019ebc78-ac3c-766f-8307-61167a68abba",
  pageTypeSlug: "exercise",
  slug: "triceps-pushdown",
  title: "Triceps Pushdown",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Triceps_Pushdown",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Triceps_Pushdown",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
