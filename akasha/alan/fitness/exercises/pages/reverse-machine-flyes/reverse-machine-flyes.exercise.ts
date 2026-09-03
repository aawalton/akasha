import type { Exercise } from "../../exercise.page-type.ts"

export const reverseMachineFlyes = {
  id: "019ebc77-ceea-7f52-afcb-be584aad9e6b",
  pageTypeSlug: "exercise",
  slug: "reverse-machine-flyes",
  title: "Reverse Machine Flyes",
  exerciseCategory: "strength",
  equipment: "machine",
  exerciseExternalId: "Reverse_Machine_Flyes",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Reverse_Machine_Flyes",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Machine_Flyes/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Machine_Flyes/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
