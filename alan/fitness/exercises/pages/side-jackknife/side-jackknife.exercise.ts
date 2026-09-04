import type { Exercise } from "../../exercise.page-type.ts"

export const sideJackknife = {
  id: "019ebc78-6269-75db-b1b2-0b976bdd2f0c",
  pageTypeSlug: "exercise",
  slug: "side-jackknife",
  title: "Side Jackknife",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Side_Jackknife",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side_Jackknife",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Jackknife/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Jackknife/0.jpg",
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
} as const satisfies Exercise
