import type { Exercise } from "../../exercise.page-type.ts"

export const declineReverseCrunch = {
  id: "019ebc76-f062-7360-9601-aea2f20144d1",
  pageTypeSlug: "exercise",
  slug: "decline-reverse-crunch",
  title: "Decline Reverse Crunch",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Decline_Reverse_Crunch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Decline_Reverse_Crunch",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Reverse_Crunch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Reverse_Crunch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
