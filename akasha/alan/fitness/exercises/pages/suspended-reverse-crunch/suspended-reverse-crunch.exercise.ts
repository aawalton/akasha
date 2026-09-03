import type { Exercise } from "../../exercise.page-type.ts"

export const suspendedReverseCrunch = {
  id: "019ebc78-a80b-7e08-bb4c-e2b4e72bc3de",
  pageTypeSlug: "exercise",
  slug: "suspended-reverse-crunch",
  title: "Suspended Reverse Crunch",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Suspended_Reverse_Crunch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Suspended_Reverse_Crunch",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Suspended_Reverse_Crunch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Suspended_Reverse_Crunch/0.jpg",
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
