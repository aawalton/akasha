import type { Exercise } from "../../exercise.page-type.ts"

export const straightArmDumbbellPullover = {
  id: "019ebc78-a45f-7cc9-8744-a2d95a77a44d",
  pageTypeSlug: "exercise",
  slug: "straight-arm-dumbbell-pullover",
  title: "Straight-Arm Dumbbell Pullover",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Straight-Arm_Dumbbell_Pullover",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Straight-Arm_Dumbbell_Pullover",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Dumbbell_Pullover/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Straight-Arm_Dumbbell_Pullover/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["lats", "shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
