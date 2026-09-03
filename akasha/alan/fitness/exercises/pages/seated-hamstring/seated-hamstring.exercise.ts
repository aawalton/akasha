import type { Exercise } from "../../exercise.page-type.ts"

export const seatedHamstring = {
  id: "019ebc78-5bbf-7709-bf85-11334ae9a9b5",
  pageTypeSlug: "exercise",
  slug: "seated-hamstring",
  title: "Seated Hamstring",
  exerciseCategory: "stretching",
  exerciseExternalId: "Seated_Hamstring",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Hamstring",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Hamstring/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Hamstring/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  secondaryMuscles: ["calves"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
