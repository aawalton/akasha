import type { Exercise } from "../../exercise.page-type.ts"

export const isometricChestSqueezes = {
  id: "019ebc77-805b-764d-8a6f-11fdb4ea6dcd",
  pageTypeSlug: "exercise",
  slug: "isometric-chest-squeezes",
  title: "Isometric Chest Squeezes",
  exerciseCategory: "plyometrics",
  equipment: "body-only",
  exerciseExternalId: "Isometric_Chest_Squeezes",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Isometric_Chest_Squeezes",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Isometric_Chest_Squeezes/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Isometric_Chest_Squeezes/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
