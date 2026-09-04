import type { Exercise } from "../../exercise.page-type.ts"

export const kneeHipRaiseOnParallelBars = {
  id: "019ebc77-87b4-764f-9b06-babfe11f195e",
  pageTypeSlug: "exercise",
  slug: "knee-hip-raise-on-parallel-bars",
  title: "Knee/Hip Raise On Parallel Bars",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Knee_Hip_Raise_On_Parallel_Bars",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Knee_Hip_Raise_On_Parallel_Bars",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Knee_Hip_Raise_On_Parallel_Bars/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Knee_Hip_Raise_On_Parallel_Bars/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
