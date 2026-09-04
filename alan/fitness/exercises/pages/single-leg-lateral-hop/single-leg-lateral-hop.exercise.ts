import type { Exercise } from "../../exercise.page-type.ts"

export const singleLegLateralHop = {
  id: "019ebc78-6668-7eba-a769-b4206322dc3a",
  pageTypeSlug: "exercise",
  slug: "single-leg-lateral-hop",
  title: "Single-Leg Lateral Hop",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Single-Leg_Lateral_Hop",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single-Leg_Lateral_Hop",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Leg_Lateral_Hop/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Leg_Lateral_Hop/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "adductors", "calves", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
