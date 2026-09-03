import type { Exercise } from "../../exercise.page-type.ts"

export const inclinePushUpReverseGrip = {
  id: "019ebc77-7e31-7cfb-ac78-b19e08fa09b5",
  pageTypeSlug: "exercise",
  slug: "incline-push-up-reverse-grip",
  title: "Incline Push-Up Reverse Grip",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Incline_Push-Up_Reverse_Grip",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Incline_Push-Up_Reverse_Grip",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Push-Up_Reverse_Grip/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Push-Up_Reverse_Grip/0.jpg",
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
