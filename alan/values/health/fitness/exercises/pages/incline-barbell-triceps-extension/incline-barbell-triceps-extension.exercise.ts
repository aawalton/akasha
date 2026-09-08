import type { Exercise } from "../../exercise.page-type.ts"

export const inclineBarbellTricepsExtension = {
  id: "019ebc77-78eb-70bc-9911-aa4c428e71b5",
  pageTypeSlug: "exercise",
  slug: "incline-barbell-triceps-extension",
  title: "Incline Barbell Triceps Extension",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Incline_Barbell_Triceps_Extension",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Incline_Barbell_Triceps_Extension",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Barbell_Triceps_Extension/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Barbell_Triceps_Extension/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
