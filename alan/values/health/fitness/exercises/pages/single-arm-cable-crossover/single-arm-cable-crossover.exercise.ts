import type { Exercise } from "../../exercise.page-type.ts"

export const singleArmCableCrossover = {
  id: "019ebc78-64dc-7140-93c6-c4bb909a63df",
  pageTypeSlug: "exercise",
  slug: "single-arm-cable-crossover",
  title: "Single-Arm Cable Crossover",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Single-Arm_Cable_Crossover",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single-Arm_Cable_Crossover",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Arm_Cable_Crossover/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Arm_Cable_Crossover/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
