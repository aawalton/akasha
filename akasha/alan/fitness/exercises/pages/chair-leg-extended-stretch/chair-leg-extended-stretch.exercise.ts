import type { Exercise } from "../../exercise.page-type.ts"

export const chairLegExtendedStretch = {
  id: "019ebc76-cd2a-7aed-9c93-aeb73a7091d2",
  pageTypeSlug: "exercise",
  slug: "chair-leg-extended-stretch",
  title: "Chair Leg Extended Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Chair_Leg_Extended_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Chair_Leg_Extended_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chair_Leg_Extended_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chair_Leg_Extended_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  secondaryMuscles: ["adductors"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
