import type { Exercise } from "../../exercise.page-type.ts"

export const inclinePushUpCloseGrip = {
  id: "019ebc77-7d72-7a07-9475-528dff9614d3",
  pageTypeSlug: "exercise",
  slug: "incline-push-up-close-grip",
  title: "Incline Push-Up Close-Grip",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Incline_Push-Up_Close-Grip",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Incline_Push-Up_Close-Grip",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Push-Up_Close-Grip/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Push-Up_Close-Grip/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.5,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
