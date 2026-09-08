import type { Exercise } from "../../exercise.page-type.ts"

export const kettlebellSumoHighPull = {
  id: "019ebc77-85a0-7d1a-b84d-d3443ae85788",
  pageTypeSlug: "exercise",
  slug: "kettlebell-sumo-high-pull",
  title: "Kettlebell Sumo High Pull",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Kettlebell_Sumo_High_Pull",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kettlebell_Sumo_High_Pull",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Sumo_High_Pull/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Sumo_High_Pull/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["traps"],
  scoringMode: "reps",
  secondaryMuscles: ["adductors", "glutes", "hamstrings", "quadriceps", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
