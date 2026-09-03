import type { Exercise } from "../../exercise.page-type.ts"

export const parallelBarDip = {
  id: "019ebc77-bf7b-75c5-a963-23bf8cbee5f8",
  pageTypeSlug: "exercise",
  slug: "parallel-bar-dip",
  title: "Parallel Bar Dip",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Parallel_Bar_Dip",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Parallel_Bar_Dip",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Parallel_Bar_Dip/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Parallel_Bar_Dip/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
