import type { Exercise } from "../../exercise.page-type.ts"

export const pushUpsWithFeetElevated = {
  id: "019ebc77-c737-7080-a702-0c4a1fc5b49a",
  pageTypeSlug: "exercise",
  slug: "push-ups-with-feet-elevated",
  title: "Push-Ups With Feet Elevated",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Push-Ups_With_Feet_Elevated",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Push-Ups_With_Feet_Elevated",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_With_Feet_Elevated/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_With_Feet_Elevated/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.74,
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
