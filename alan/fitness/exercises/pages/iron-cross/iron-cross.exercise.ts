import type { Exercise } from "../../exercise.page-type.ts"

export const ironCross = {
  id: "019ebc77-7fe4-715e-aae0-67832c2cc80f",
  pageTypeSlug: "exercise",
  slug: "iron-cross",
  title: "Iron Cross",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Iron_Cross",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Iron_Cross",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Iron_Cross/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Iron_Cross/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "glutes", "hamstrings", "lower-back", "quadriceps", "traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
} as const satisfies Exercise
