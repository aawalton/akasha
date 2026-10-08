import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const singleLegButtKick = {
  id: "019ebc78-6766-7d3e-83fd-c816b01cc1b1",
  type: "page-type/strength-exercise",
  slug: "single-leg-butt-kick",
  title: "Single Leg Butt Kick",
  exerciseCategory: "plyometrics",
  equipment: "strength-exercise-implement/body-only",
  exerciseExternalId: "Single_Leg_Butt_Kick",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single_Leg_Butt_Kick",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single_Leg_Butt_Kick/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single_Leg_Butt_Kick/0.jpg",
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
  secondaryMuscles: ["calves", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:27.942Z",
  updatedAt: "2026-09-15T17:41:38.000Z",
} as const satisfies StrengthExercise
