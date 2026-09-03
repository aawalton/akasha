import type { Exercise } from "../../exercise.page-type.ts"

export const reverseFlyesWithExternalRotation = {
  id: "019ebc77-cde7-7f15-9aa8-a4e1e5190417",
  pageTypeSlug: "exercise",
  slug: "reverse-flyes-with-external-rotation",
  title: "Reverse Flyes With External Rotation",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Reverse_Flyes_With_External_Rotation",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Reverse_Flyes_With_External_Rotation",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Flyes_With_External_Rotation/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Flyes_With_External_Rotation/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
