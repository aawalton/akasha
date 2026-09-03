import type { Exercise } from "../../exercise.page-type.ts"

export const doubleKettlebellSnatch = {
  id: "019ebc76-f318-79f1-8dad-d1943d0019c6",
  pageTypeSlug: "exercise",
  slug: "double-kettlebell-snatch",
  title: "Double Kettlebell Snatch",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Double_Kettlebell_Snatch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Double_Kettlebell_Snatch",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Double_Kettlebell_Snatch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Double_Kettlebell_Snatch/0.jpg",
  implementCount: 2,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings", "quadriceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
