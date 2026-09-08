import type { Exercise } from "../../exercise.page-type.ts"

export const crunches = {
  id: "019ebc76-e10c-76c3-90bf-a87c65172e6a",
  pageTypeSlug: "exercise",
  slug: "crunches",
  title: "Crunches",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Crunches",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Crunches",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunches/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunches/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
