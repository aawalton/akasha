import type { Exercise } from "../../exercise.page-type.ts"

export const standingLowPulleyDeltoidRaise = {
  id: "019ebc78-8a97-7aff-ac87-bc25be1a8037",
  pageTypeSlug: "exercise",
  slug: "standing-low-pulley-deltoid-raise",
  title: "Standing Low-Pulley Deltoid Raise",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Standing_Low-Pulley_Deltoid_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Low-Pulley_Deltoid_Raise",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Low-Pulley_Deltoid_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Low-Pulley_Deltoid_Raise/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
