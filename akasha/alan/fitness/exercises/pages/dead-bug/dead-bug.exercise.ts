import type { Exercise } from "../../exercise.page-type.ts"

export const deadBug = {
  id: "019ebc76-e1d6-73a8-b3bb-9a966e08033c",
  pageTypeSlug: "exercise",
  slug: "dead-bug",
  title: "Dead Bug",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Dead_Bug",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Dead_Bug",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "core-anti-extension",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
