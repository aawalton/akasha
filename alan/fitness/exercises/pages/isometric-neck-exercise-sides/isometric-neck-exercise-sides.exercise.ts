import type { Exercise } from "../../exercise.page-type.ts"

export const isometricNeckExerciseSides = {
  id: "019ebc77-80de-7299-aab1-59b0f80feb6b",
  pageTypeSlug: "exercise",
  slug: "isometric-neck-exercise-sides",
  title: "Isometric Neck Exercise - Sides",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Isometric_Neck_Exercise_-_Sides",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Isometric_Neck_Exercise_-_Sides",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Isometric_Neck_Exercise_-_Sides/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Isometric_Neck_Exercise_-_Sides/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "other",
  primaryMuscles: ["neck"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
