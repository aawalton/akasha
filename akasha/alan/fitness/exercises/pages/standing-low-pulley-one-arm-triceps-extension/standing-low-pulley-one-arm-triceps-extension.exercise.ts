import type { Exercise } from "../../exercise.page-type.ts"

export const standingLowPulleyOneArmTricepsExtension = {
  id: "019ebc78-8ad6-71c6-a914-8673947e3b1f",
  pageTypeSlug: "exercise",
  slug: "standing-low-pulley-one-arm-triceps-extension",
  title: "Standing Low-Pulley One-Arm Triceps Extension",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Standing_Low-Pulley_One-Arm_Triceps_Extension",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Low-Pulley_One-Arm_Triceps_Extension",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Low-Pulley_One-Arm_Triceps_Extension/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Low-Pulley_One-Arm_Triceps_Extension/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
