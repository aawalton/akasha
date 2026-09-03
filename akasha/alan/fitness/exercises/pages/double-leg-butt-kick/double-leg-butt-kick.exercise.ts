import type { Exercise } from "../../exercise.page-type.ts"

export const doubleLegButtKick = {
  id: "019ebc77-00cf-78cc-b505-68933a0d014b",
  pageTypeSlug: "exercise",
  slug: "double-leg-butt-kick",
  title: "Double Leg Butt Kick",
  exerciseCategory: "plyometrics",
  equipment: "body-only",
  exerciseExternalId: "Double_Leg_Butt_Kick",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Double_Leg_Butt_Kick",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Double_Leg_Butt_Kick/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Double_Leg_Butt_Kick/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
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
