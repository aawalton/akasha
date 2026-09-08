import type { Exercise } from "../../exercise.page-type.ts"

export const isometricNeckExerciseFrontAndBack = {
  id: "019ebc77-809b-7ed8-a1f9-4506d4b0459e",
  pageTypeSlug: "exercise",
  slug: "isometric-neck-exercise-front-and-back",
  title: "Isometric Neck Exercise - Front And Back",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Isometric_Neck_Exercise_-_Front_And_Back",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Isometric_Neck_Exercise_-_Front_And_Back",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Isometric_Neck_Exercise_-_Front_And_Back/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Isometric_Neck_Exercise_-_Front_And_Back/0.jpg",
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
