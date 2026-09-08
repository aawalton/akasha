import type { Exercise } from "../../exercise.page-type.ts"

export const sledReverseFlye = {
  id: "019ebc78-6a5e-7dda-b208-83578dad8743",
  pageTypeSlug: "exercise",
  slug: "sled-reverse-flye",
  title: "Sled Reverse Flye",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Sled_Reverse_Flye",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Sled_Reverse_Flye",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Reverse_Flye/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Reverse_Flye/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "h-push",
  muscleFocus: "pull",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
