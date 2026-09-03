import type { Exercise } from "../../exercise.page-type.ts"

export const sledgehammerSwings = {
  id: "019ebc78-6ae2-7d09-8b36-e88bc6934b67",
  pageTypeSlug: "exercise",
  slug: "sledgehammer-swings",
  title: "Sledgehammer Swings",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Sledgehammer_Swings",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Sledgehammer_Swings",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sledgehammer_Swings/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sledgehammer_Swings/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "forearms", "lats", "middle-back", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
