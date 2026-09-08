import type { Exercise } from "../../exercise.page-type.ts"

export const plyoPushUp = {
  id: "019ebc77-c2a1-7d55-9ec1-a94a10cd6fd5",
  pageTypeSlug: "exercise",
  slug: "plyo-push-up",
  title: "Plyo Push-up",
  exerciseCategory: "plyometrics",
  equipment: "body-only",
  exerciseExternalId: "Plyo_Push-up",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Plyo_Push-up",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plyo_Push-up/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plyo_Push-up/0.jpg",
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
