import type { Exercise } from "../../exercise.page-type.ts"

export const singleLegGluteBridge = {
  id: "019ebc78-67a4-79ea-92f2-e9de4ac56d75",
  pageTypeSlug: "exercise",
  slug: "single-leg-glute-bridge",
  title: "Single Leg Glute Bridge",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Single_Leg_Glute_Bridge",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single_Leg_Glute_Bridge",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single_Leg_Glute_Bridge/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single_Leg_Glute_Bridge/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.5,
  mechanic: "isolation",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["hamstrings"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
