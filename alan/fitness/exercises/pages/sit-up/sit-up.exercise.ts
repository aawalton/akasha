import type { Exercise } from "../../exercise.page-type.ts"

export const sitUp = {
  id: "019ebc78-6825-7d3d-94a6-db98bdbd4d1a",
  pageTypeSlug: "exercise",
  slug: "sit-up",
  title: "Sit-Up",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Sit-Up",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Sit-Up",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sit-Up/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sit-Up/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
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
