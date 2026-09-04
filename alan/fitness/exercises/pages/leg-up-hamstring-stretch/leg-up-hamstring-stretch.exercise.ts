import type { Exercise } from "../../exercise.page-type.ts"

export const legUpHamstringStretch = {
  id: "019ebc77-8cac-76a4-86fb-1d5952396eb2",
  pageTypeSlug: "exercise",
  slug: "leg-up-hamstring-stretch",
  title: "Leg-Up Hamstring Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Leg-Up_Hamstring_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Leg-Up_Hamstring_Stretch",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg-Up_Hamstring_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg-Up_Hamstring_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
