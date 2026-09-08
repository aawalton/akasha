import type { Exercise } from "../../exercise.page-type.ts"

export const inclinePushUpMedium = {
  id: "019ebc77-7def-7601-bf2e-fb56efccce2b",
  pageTypeSlug: "exercise",
  slug: "incline-push-up-medium",
  title: "Incline Push-Up Medium",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Incline_Push-Up_Medium",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Incline_Push-Up_Medium",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Push-Up_Medium/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Push-Up_Medium/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.5,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
