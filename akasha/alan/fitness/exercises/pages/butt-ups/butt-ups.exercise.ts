import type { Exercise } from "../../exercise.page-type.ts"

export const buttUps = {
  id: "019ebc76-b607-748c-92f5-3debc8259ce3",
  pageTypeSlug: "exercise",
  slug: "butt-ups",
  title: "Butt-Ups",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Butt-Ups",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Butt-Ups",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt-Ups/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butt-Ups/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
