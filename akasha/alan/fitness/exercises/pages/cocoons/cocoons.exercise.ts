import type { Exercise } from "../../exercise.page-type.ts"

export const cocoons = {
  id: "019ebc76-deb6-7c76-89dc-4da942dd3b4b",
  pageTypeSlug: "exercise",
  slug: "cocoons",
  title: "Cocoons",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Cocoons",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Cocoons",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cocoons/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cocoons/0.jpg",
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
