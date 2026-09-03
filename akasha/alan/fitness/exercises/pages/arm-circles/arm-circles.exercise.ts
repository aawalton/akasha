import type { Exercise } from "../../exercise.page-type.ts"

export const armCircles = {
  id: "019ebc76-195d-7524-8523-005c534b0f16",
  pageTypeSlug: "exercise",
  slug: "arm-circles",
  title: "Arm Circles",
  exerciseCategory: "stretching",
  exerciseExternalId: "Arm_Circles",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Arm_Circles",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arm_Circles/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Arm_Circles/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "time",
  secondaryMuscles: ["traps"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
