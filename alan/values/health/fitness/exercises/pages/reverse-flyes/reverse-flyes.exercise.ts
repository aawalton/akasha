import type { Exercise } from "../../exercise.page-type.ts"

export const reverseFlyes = {
  id: "019ebc77-cdad-7172-9800-a9a1d09e3bca",
  pageTypeSlug: "exercise",
  slug: "reverse-flyes",
  title: "Reverse Flyes",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Reverse_Flyes",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Reverse_Flyes",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Flyes/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Flyes/0.jpg",
  implementCount: 2,
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
