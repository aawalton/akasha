import type { Exercise } from "../../exercise.page-type.ts"

export const kneelingHighPulleyRow = {
  id: "019ebc77-8985-7eb4-8d21-a7093a4fc0e3",
  pageTypeSlug: "exercise",
  slug: "kneeling-high-pulley-row",
  title: "Kneeling High Pulley Row",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Kneeling_High_Pulley_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kneeling_High_Pulley_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_High_Pulley_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_High_Pulley_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "middle-back"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
