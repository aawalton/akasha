import type { Exercise } from "../../exercise.page-type.ts"

export const backFlyesWithBands = {
  id: "019ebc76-1b5e-77ef-89d9-6bb70d7ee081",
  pageTypeSlug: "exercise",
  slug: "back-flyes-with-bands",
  title: "Back Flyes - With Bands",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Back_Flyes_-_With_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Back_Flyes_-_With_Bands",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Back_Flyes_-_With_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Back_Flyes_-_With_Bands/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["middle-back", "triceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
