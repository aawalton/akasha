import type { Exercise } from "../../exercise.page-type.ts"

export const twoArmKettlebellJerk = {
  id: "019ebc78-ae14-7bad-8758-688e37be5557",
  pageTypeSlug: "exercise",
  slug: "two-arm-kettlebell-jerk",
  title: "Two-Arm Kettlebell Jerk",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Two-Arm_Kettlebell_Jerk",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Two-Arm_Kettlebell_Jerk",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Kettlebell_Jerk/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Kettlebell_Jerk/0.jpg",
  implementCount: 2,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "quadriceps", "triceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
