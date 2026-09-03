import type { Exercise } from "../../exercise.page-type.ts"

export const sideBridge = {
  id: "019ebc78-61f1-7569-92a5-f0695297fd32",
  pageTypeSlug: "exercise",
  slug: "side-bridge",
  title: "Side Bridge",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Side_Bridge",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side_Bridge",
  force: "static",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Bridge/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Bridge/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
} as const satisfies Exercise
