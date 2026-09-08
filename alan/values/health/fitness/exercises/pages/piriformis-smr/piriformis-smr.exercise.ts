import type { Exercise } from "../../exercise.page-type.ts"

export const piriformisSmr = {
  id: "019ebc77-c0eb-7a1a-bf33-46bae63712f4",
  pageTypeSlug: "exercise",
  slug: "piriformis-smr",
  title: "Piriformis-SMR",
  exerciseCategory: "stretching",
  equipment: "foam-roll",
  exerciseExternalId: "Piriformis-SMR",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Piriformis-SMR",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Piriformis-SMR/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Piriformis-SMR/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
