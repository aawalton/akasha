import type { Exercise } from "../../exercise.page-type.ts"

export const tricepsPushdownVBarAttachment = {
  id: "019ebc78-acca-7ad0-95da-b9cd413a9f3f",
  pageTypeSlug: "exercise",
  slug: "triceps-pushdown-v-bar-attachment",
  title: "Triceps Pushdown - V-Bar Attachment",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Triceps_Pushdown_-_V-Bar_Attachment",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Triceps_Pushdown_-_V-Bar_Attachment",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_V-Bar_Attachment/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Pushdown_-_V-Bar_Attachment/0.jpg",
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
