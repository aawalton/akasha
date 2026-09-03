import type { Exercise } from "../../exercise.page-type.ts"

export const barbellAbRollout = {
  id: "019ebc76-209d-7707-a877-7bd033e5de6f",
  pageTypeSlug: "exercise",
  slug: "barbell-ab-rollout",
  title: "Barbell Ab Rollout",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Ab_Rollout",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Ab_Rollout",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "core-anti-extension",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["lower-back", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
