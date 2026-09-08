import type { Exercise } from "../../exercise.page-type.ts"

export const pushUpsWithFeetOnAnExerciseBall = {
  id: "019ebc77-c774-7543-bb4a-64d008e7795c",
  pageTypeSlug: "exercise",
  slug: "push-ups-with-feet-on-an-exercise-ball",
  title: "Push-Ups With Feet On An Exercise Ball",
  exerciseCategory: "strength",
  equipment: "exercise-ball",
  exerciseExternalId: "Push-Ups_With_Feet_On_An_Exercise_Ball",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Push-Ups_With_Feet_On_An_Exercise_Ball",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_With_Feet_On_An_Exercise_Ball/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push-Ups_With_Feet_On_An_Exercise_Ball/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
