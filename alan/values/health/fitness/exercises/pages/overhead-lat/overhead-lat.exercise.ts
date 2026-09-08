import type { Exercise } from "../../exercise.page-type.ts"

export const overheadLat = {
  id: "019ebc77-bcbc-7bbf-97cf-a61f9c0deb58",
  pageTypeSlug: "exercise",
  slug: "overhead-lat",
  title: "Overhead Lat",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Overhead_Lat",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Overhead_Lat",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Lat/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Lat/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "time",
  secondaryMuscles: ["triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
