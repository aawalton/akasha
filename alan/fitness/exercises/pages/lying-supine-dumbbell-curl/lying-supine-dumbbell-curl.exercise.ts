import type { Exercise } from "../../exercise.page-type.ts"

export const lyingSupineDumbbellCurl = {
  id: "019ebc77-98fe-7293-a1e5-2dd8ff868a28",
  pageTypeSlug: "exercise",
  slug: "lying-supine-dumbbell-curl",
  title: "Lying Supine Dumbbell Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Lying_Supine_Dumbbell_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Supine_Dumbbell_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Supine_Dumbbell_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Supine_Dumbbell_Curl/0.jpg",
  implementCount: 2,
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
