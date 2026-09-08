import type { Exercise } from "../../exercise.page-type.ts"

export const smithMachineCloseGripBenchPress = {
  id: "019ebc78-6c67-72eb-bee1-56bb4f1294e0",
  pageTypeSlug: "exercise",
  slug: "smith-machine-close-grip-bench-press",
  title: "Smith Machine Close-Grip Bench Press",
  exerciseCategory: "strength",
  equipment: "machine",
  exerciseExternalId: "Smith_Machine_Close-Grip_Bench_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Smith_Machine_Close-Grip_Bench_Press",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Close-Grip_Bench_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Close-Grip_Bench_Press/0.jpg",
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
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
