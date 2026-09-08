import type { Exercise } from "../../exercise.page-type.ts"

export const hyperextensionsWithNoHyperextensionBench = {
  id: "019ebc77-7800-7f16-bd62-14262998e3b3",
  pageTypeSlug: "exercise",
  slug: "hyperextensions-with-no-hyperextension-bench",
  title: "Hyperextensions With No Hyperextension Bench",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Hyperextensions_With_No_Hyperextension_Bench",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Hyperextensions_With_No_Hyperextension_Bench",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_With_No_Hyperextension_Bench/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hyperextensions_With_No_Hyperextension_Bench/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
