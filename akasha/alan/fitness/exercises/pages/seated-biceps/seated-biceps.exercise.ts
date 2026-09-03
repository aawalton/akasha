import type { Exercise } from "../../exercise.page-type.ts"

export const seatedBiceps = {
  id: "019ebc78-54ad-718b-aa6c-923e761247c5",
  pageTypeSlug: "exercise",
  slug: "seated-biceps",
  title: "Seated Biceps",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Seated_Biceps",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Biceps",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Biceps/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Biceps/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "time",
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
