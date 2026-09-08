import type { Exercise } from "../../exercise.page-type.ts"

export const flatBenchCableFlyes = {
  id: "019ebc77-397f-74ce-9f7e-e0c2c5d9dda4",
  pageTypeSlug: "exercise",
  slug: "flat-bench-cable-flyes",
  title: "Flat Bench Cable Flyes",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Flat_Bench_Cable_Flyes",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Flat_Bench_Cable_Flyes",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Cable_Flyes/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flat_Bench_Cable_Flyes/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
