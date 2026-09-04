import type { Exercise } from "../../exercise.page-type.ts"

export const lookingAtCeiling = {
  id: "019ebc77-9122-7066-846b-1c30137e538b",
  pageTypeSlug: "exercise",
  slug: "looking-at-ceiling",
  title: "Looking At Ceiling",
  exerciseCategory: "stretching",
  exerciseExternalId: "Looking_At_Ceiling",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Looking_At_Ceiling",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Looking_At_Ceiling/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Looking_At_Ceiling/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
