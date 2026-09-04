import type { Exercise } from "../../exercise.page-type.ts"

export const windmills = {
  id: "019ebc78-c1c1-7be3-9c98-76f17029a3ae",
  pageTypeSlug: "exercise",
  slug: "windmills",
  title: "Windmills",
  exerciseCategory: "stretching",
  exerciseExternalId: "Windmills",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Windmills",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Windmills/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Windmills/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["abductors"],
  scoringMode: "time",
  secondaryMuscles: ["glutes", "hamstrings", "lower-back"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
