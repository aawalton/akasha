import type { Exercise } from "../../exercise.page-type.ts"

export const tricepsOverheadExtensionWithRope = {
  id: "019ebc78-abfb-725a-bfda-f6509452f4ed",
  pageTypeSlug: "exercise",
  slug: "triceps-overhead-extension-with-rope",
  title: "Triceps Overhead Extension with Rope",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Triceps_Overhead_Extension_with_Rope",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Triceps_Overhead_Extension_with_Rope",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Overhead_Extension_with_Rope/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Triceps_Overhead_Extension_with_Rope/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
