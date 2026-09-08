import type { Exercise } from "../../exercise.page-type.ts"

export const landmine180s = {
  id: "019ebc77-8ab4-76b4-8e80-bcfd1db98ad4",
  pageTypeSlug: "exercise",
  slug: "landmine-180s",
  title: "Landmine 180's",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Landmine_180s",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Landmine_180s",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Landmine_180s/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Landmine_180s/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "core-anti-rotation",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "lower-back", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
