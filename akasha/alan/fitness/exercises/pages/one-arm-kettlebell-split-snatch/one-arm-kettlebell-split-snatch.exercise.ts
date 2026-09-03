import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmKettlebellSplitSnatch = {
  id: "019ebc77-b6cd-71f9-b798-534e9d1eba79",
  pageTypeSlug: "exercise",
  slug: "one-arm-kettlebell-split-snatch",
  title: "One-Arm Kettlebell Split Snatch",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "One-Arm_Kettlebell_Split_Snatch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Kettlebell_Split_Snatch",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Split_Snatch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Split_Snatch/0.jpg",
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
  secondaryMuscles: ["hamstrings", "quadriceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
