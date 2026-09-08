import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmKettlebellSnatch = {
  id: "019ebc77-b644-7bb6-913e-ffc7b37807e6",
  pageTypeSlug: "exercise",
  slug: "one-arm-kettlebell-snatch",
  title: "One-Arm Kettlebell Snatch",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "One-Arm_Kettlebell_Snatch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Kettlebell_Snatch",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Snatch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Snatch/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings", "lower-back", "traps", "triceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
