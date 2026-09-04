import type { Exercise } from "../../exercise.page-type.ts"

export const farmersWalk = {
  id: "019ebc77-38be-7ad2-9090-8842e93e36bd",
  pageTypeSlug: "exercise",
  slug: "farmers-walk",
  title: "Farmer's Walk",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Farmers_Walk",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Farmers_Walk",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "carry",
  muscleFocus: "pull",
  primaryMuscles: ["forearms"],
  scoringMode: "time",
  secondaryMuscles: ["abdominals", "glutes", "hamstrings", "lower-back", "quadriceps", "traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
