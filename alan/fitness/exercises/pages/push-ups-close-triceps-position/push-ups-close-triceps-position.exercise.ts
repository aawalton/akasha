import type { Exercise } from "../../exercise.page-type.ts"

export const pushUpsCloseTricepsPosition = {
  id: "019ebc77-c6fb-76aa-aba8-ad26720dcb9e",
  pageTypeSlug: "exercise",
  slug: "push-ups-close-triceps-position",
  title: "Push-Ups - Close Triceps Position",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Push-Ups_-_Close_Triceps_Position",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Push-Ups_-_Close_Triceps_Position",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_-_Close_Triceps_Position/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_-_Close_Triceps_Position/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.64,
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
