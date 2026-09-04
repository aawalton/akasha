import type { Exercise } from "../../exercise.page-type.ts"

export const speedBandOverheadTriceps = {
  id: "019ebc78-7c7d-79c2-a74d-e413e8f97c8a",
  pageTypeSlug: "exercise",
  slug: "speed-band-overhead-triceps",
  title: "Speed Band Overhead Triceps",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Speed_Band_Overhead_Triceps",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Speed_Band_Overhead_Triceps",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Speed_Band_Overhead_Triceps/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Speed_Band_Overhead_Triceps/0.jpg",
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
