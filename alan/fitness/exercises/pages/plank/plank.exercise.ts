import type { Exercise } from "../../exercise.page-type.ts"

export const plank = {
  id: "019ebc77-c12a-7aac-92bb-b4b888ace462",
  pageTypeSlug: "exercise",
  slug: "plank",
  title: "Plank",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Plank",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Plank",
  force: "static",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-extension",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
