import type { Exercise } from "../../exercise.page-type.ts"

export const barbellAbRolloutOnKnees = {
  id: "019ebc76-20d9-7207-b3dc-b08de797a255",
  pageTypeSlug: "exercise",
  slug: "barbell-ab-rollout-on-knees",
  title: "Barbell Ab Rollout - On Knees",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Ab_Rollout_-_On_Knees",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Ab_Rollout_-_On_Knees",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout_-_On_Knees/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Ab_Rollout_-_On_Knees/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
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
