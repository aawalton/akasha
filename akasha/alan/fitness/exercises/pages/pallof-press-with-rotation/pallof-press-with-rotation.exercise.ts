import type { Exercise } from "../../exercise.page-type.ts"

export const pallofPressWithRotation = {
  id: "019ebc77-be40-7a50-a5c9-de8bc6fc3e9e",
  pageTypeSlug: "exercise",
  slug: "pallof-press-with-rotation",
  title: "Pallof Press With Rotation",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Pallof_Press_With_Rotation",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Pallof_Press_With_Rotation",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pallof_Press_With_Rotation/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pallof_Press_With_Rotation/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "core-anti-rotation",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
