import type { Exercise } from "../../exercise.page-type.ts"

export const twoArmKettlebellRow = {
  id: "019ebc78-ae9c-7d2f-b767-9da309967e1f",
  pageTypeSlug: "exercise",
  slug: "two-arm-kettlebell-row",
  title: "Two-Arm Kettlebell Row",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Two-Arm_Kettlebell_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Two-Arm_Kettlebell_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Kettlebell_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Kettlebell_Row/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
