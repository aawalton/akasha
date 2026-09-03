import type { Exercise } from "../../exercise.page-type.ts"

export const exercise34SitUp = {
  id: "019ebc75-79c1-70d2-9b33-3c5b2cd6f405",
  pageTypeSlug: "exercise",
  slug: "exercise-3-4-sit-up",
  title: "3/4 Sit-Up",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "3_4_Sit-Up",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/3_4_Sit-Up",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/3_4_Sit-Up/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
