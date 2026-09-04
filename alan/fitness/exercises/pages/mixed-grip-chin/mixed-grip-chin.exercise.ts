import type { Exercise } from "../../exercise.page-type.ts"

export const mixedGripChin = {
  id: "019ebc77-9c23-7f89-b3bf-d10f6747c858",
  pageTypeSlug: "exercise",
  slug: "mixed-grip-chin",
  title: "Mixed Grip Chin",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Mixed_Grip_Chin",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Mixed_Grip_Chin",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Mixed_Grip_Chin/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Mixed_Grip_Chin/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
