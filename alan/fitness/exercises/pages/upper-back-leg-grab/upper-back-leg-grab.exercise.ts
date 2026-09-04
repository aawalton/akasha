import type { Exercise } from "../../exercise.page-type.ts"

export const upperBackLegGrab = {
  id: "019ebc78-af23-7eaa-84c5-5644a1990bfd",
  pageTypeSlug: "exercise",
  slug: "upper-back-leg-grab",
  title: "Upper Back-Leg Grab",
  exerciseCategory: "stretching",
  exerciseExternalId: "Upper_Back-Leg_Grab",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Upper_Back-Leg_Grab",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upper_Back-Leg_Grab/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upper_Back-Leg_Grab/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  secondaryMuscles: ["lower-back", "middle-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
