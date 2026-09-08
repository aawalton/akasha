import type { Exercise } from "../../exercise.page-type.ts"

export const frogSitUps = {
  id: "019ebc77-4082-748d-8a2a-f6e87863e6f5",
  pageTypeSlug: "exercise",
  slug: "frog-sit-ups",
  title: "Frog Sit-Ups",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Frog_Sit-Ups",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Frog_Sit-Ups",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Frog_Sit-Ups/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Frog_Sit-Ups/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
