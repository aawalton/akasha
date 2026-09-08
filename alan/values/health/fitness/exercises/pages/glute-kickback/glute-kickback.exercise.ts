import type { Exercise } from "../../exercise.page-type.ts"

export const gluteKickback = {
  id: "019ebc77-450e-7a97-935b-9d93c3729f53",
  pageTypeSlug: "exercise",
  slug: "glute-kickback",
  title: "Glute Kickback",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Glute_Kickback",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Glute_Kickback",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Glute_Kickback/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Glute_Kickback/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["hamstrings"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
