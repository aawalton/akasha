import type { Exercise } from "../../exercise.page-type.ts"

export const lyingHamstring = {
  id: "019ebc77-973f-701f-9a93-adeeafbcba1f",
  pageTypeSlug: "exercise",
  slug: "lying-hamstring",
  title: "Lying Hamstring",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Lying_Hamstring",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Hamstring",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Hamstring/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Hamstring/0.jpg",
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
