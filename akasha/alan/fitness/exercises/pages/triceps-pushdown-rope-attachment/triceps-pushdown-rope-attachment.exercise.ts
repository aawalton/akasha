import type { Exercise } from "../../exercise.page-type.ts"

export const tricepsPushdownRopeAttachment = {
  id: "019ebc78-ac8a-7dbf-8636-c8eab70cd60a",
  pageTypeSlug: "exercise",
  slug: "triceps-pushdown-rope-attachment",
  title: "Triceps Pushdown - Rope Attachment",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Triceps_Pushdown_-_Rope_Attachment",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Triceps_Pushdown_-_Rope_Attachment",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_Rope_Attachment/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_Rope_Attachment/0.jpg",
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
