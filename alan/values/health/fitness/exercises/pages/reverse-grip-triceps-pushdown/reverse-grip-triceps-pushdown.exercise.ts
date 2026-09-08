import type { Exercise } from "../../exercise.page-type.ts"

export const reverseGripTricepsPushdown = {
  id: "019ebc77-ce72-763c-9d6e-348a1ad3dc5d",
  pageTypeSlug: "exercise",
  slug: "reverse-grip-triceps-pushdown",
  title: "Reverse Grip Triceps Pushdown",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Reverse_Grip_Triceps_Pushdown",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Reverse_Grip_Triceps_Pushdown",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Grip_Triceps_Pushdown/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Grip_Triceps_Pushdown/0.jpg",
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
