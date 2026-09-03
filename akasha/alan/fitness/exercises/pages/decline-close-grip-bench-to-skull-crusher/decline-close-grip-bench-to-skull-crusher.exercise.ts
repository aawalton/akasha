import type { Exercise } from "../../exercise.page-type.ts"

export const declineCloseGripBenchToSkullCrusher = {
  id: "019ebc76-ee70-74e7-99b5-e0de75d4284c",
  pageTypeSlug: "exercise",
  slug: "decline-close-grip-bench-to-skull-crusher",
  title: "Decline Close-Grip Bench To Skull Crusher",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Decline_Close-Grip_Bench_To_Skull_Crusher",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Decline_Close-Grip_Bench_To_Skull_Crusher",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Close-Grip_Bench_To_Skull_Crusher/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Decline_Close-Grip_Bench_To_Skull_Crusher/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
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
