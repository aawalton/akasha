import type { Exercise } from "../../exercise.page-type.ts"

export const alternateLegDiagonalBound = {
  id: "019ebc75-c0af-7281-9a4f-3d963c58b313",
  pageTypeSlug: "exercise",
  slug: "alternate-leg-diagonal-bound",
  title: "Alternate Leg Diagonal Bound",
  exerciseCategory: "plyometrics",
  exerciseExternalId: "Alternate_Leg_Diagonal_Bound",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Alternate_Leg_Diagonal_Bound",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Leg_Diagonal_Bound/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Leg_Diagonal_Bound/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "alternating",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "adductors", "calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
