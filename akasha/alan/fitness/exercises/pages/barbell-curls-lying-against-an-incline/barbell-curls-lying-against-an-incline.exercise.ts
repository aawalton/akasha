import type { Exercise } from "../../exercise.page-type.ts"

export const barbellCurlsLyingAgainstAnIncline = {
  id: "019ebc76-21b3-7dfb-a953-69d6d1754169",
  pageTypeSlug: "exercise",
  slug: "barbell-curls-lying-against-an-incline",
  title: "Barbell Curls Lying Against An Incline",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Curls_Lying_Against_An_Incline",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Curls_Lying_Against_An_Incline",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curls_Lying_Against_An_Incline/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Curls_Lying_Against_An_Incline/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
