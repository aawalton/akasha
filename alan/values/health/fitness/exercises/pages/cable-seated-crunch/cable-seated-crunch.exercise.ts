import type { Exercise } from "../../exercise.page-type.ts"

export const cableSeatedCrunch = {
  id: "019ebc76-c403-74f7-a075-1f76f1288bfb",
  pageTypeSlug: "exercise",
  slug: "cable-seated-crunch",
  title: "Cable Seated Crunch",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Cable_Seated_Crunch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Cable_Seated_Crunch",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Seated_Crunch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Seated_Crunch/0.jpg",
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
