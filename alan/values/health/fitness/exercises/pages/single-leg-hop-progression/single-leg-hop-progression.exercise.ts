import type { Exercise } from "../../exercise.page-type.ts"

export const singleLegHopProgression = {
  id: "019ebc78-6623-772a-8563-782289d4363a",
  pageTypeSlug: "exercise",
  slug: "single-leg-hop-progression",
  title: "Single-Leg Hop Progression",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Single-Leg_Hop_Progression",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single-Leg_Hop_Progression",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Leg_Hop_Progression/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Leg_Hop_Progression/0.jpg",
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
