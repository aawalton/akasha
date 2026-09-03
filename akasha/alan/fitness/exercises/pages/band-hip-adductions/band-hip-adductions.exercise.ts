import type { Exercise } from "../../exercise.page-type.ts"

export const bandHipAdductions = {
  id: "019ebc76-1fe0-7232-82e5-83a99c737b45",
  pageTypeSlug: "exercise",
  slug: "band-hip-adductions",
  title: "Band Hip Adductions",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Band_Hip_Adductions",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Band_Hip_Adductions",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Hip_Adductions/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Hip_Adductions/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
