import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmKettlebellSplitJerk = {
  id: "019ebc77-b68a-780d-808e-cccb800c6e87",
  pageTypeSlug: "exercise",
  slug: "one-arm-kettlebell-split-jerk",
  title: "One-Arm Kettlebell Split Jerk",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "One-Arm_Kettlebell_Split_Jerk",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Kettlebell_Split_Jerk",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Split_Jerk/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Split_Jerk/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings", "quadriceps", "triceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
