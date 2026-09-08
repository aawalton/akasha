import type { Exercise } from "../../exercise.page-type.ts"

export const bentArmBarbellPullover = {
  id: "019ebc76-a024-7c93-8e08-19f75f60dd57",
  pageTypeSlug: "exercise",
  slug: "bent-arm-barbell-pullover",
  title: "Bent-Arm Barbell Pullover",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Bent-Arm_Barbell_Pullover",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bent-Arm_Barbell_Pullover",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Barbell_Pullover/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Barbell_Pullover/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "lats", "shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
