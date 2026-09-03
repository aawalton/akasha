import type { Exercise } from "../../exercise.page-type.ts"

export const gorillaChinCrunch = {
  id: "019ebc77-4a38-719b-bd8f-401a35501a50",
  pageTypeSlug: "exercise",
  slug: "gorilla-chin-crunch",
  title: "Gorilla Chin/Crunch",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Gorilla_Chin_Crunch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Gorilla_Chin_Crunch",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Gorilla_Chin_Crunch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Gorilla_Chin_Crunch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
