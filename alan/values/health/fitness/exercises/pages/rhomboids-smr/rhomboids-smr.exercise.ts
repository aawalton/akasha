import type { Exercise } from "../../exercise.page-type.ts"

export const rhomboidsSmr = {
  id: "019ebc77-cf9e-74b9-84ea-fc53ab5317ba",
  pageTypeSlug: "exercise",
  slug: "rhomboids-smr",
  title: "Rhomboids-SMR",
  exerciseCategory: "stretching",
  equipment: "foam-roll",
  exerciseExternalId: "Rhomboids-SMR",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Rhomboids-SMR",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rhomboids-SMR/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rhomboids-SMR/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "time",
  secondaryMuscles: ["traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
