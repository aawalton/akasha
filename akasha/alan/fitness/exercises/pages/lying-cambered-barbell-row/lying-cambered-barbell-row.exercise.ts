import type { Exercise } from "../../exercise.page-type.ts"

export const lyingCamberedBarbellRow = {
  id: "019ebc77-936d-7729-9a42-7f7cc7d1a792",
  pageTypeSlug: "exercise",
  slug: "lying-cambered-barbell-row",
  title: "Lying Cambered Barbell Row",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Lying_Cambered_Barbell_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Cambered_Barbell_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Cambered_Barbell_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Cambered_Barbell_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats", "traps"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
