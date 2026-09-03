import type { Exercise } from "../../exercise.page-type.ts"

export const barbellSideBend = {
  id: "019ebc76-9af9-7fda-a4cd-1a0b72345165",
  pageTypeSlug: "exercise",
  slug: "barbell-side-bend",
  title: "Barbell Side Bend",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Side_Bend",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Side_Bend",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Side_Bend/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Side_Bend/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-lateral-flexion",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["lower-back"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
