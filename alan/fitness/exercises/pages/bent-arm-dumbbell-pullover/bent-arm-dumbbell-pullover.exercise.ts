import type { Exercise } from "../../exercise.page-type.ts"

export const bentArmDumbbellPullover = {
  id: "019ebc76-a1b2-7ade-8ad4-11d370aa6f7c",
  pageTypeSlug: "exercise",
  slug: "bent-arm-dumbbell-pullover",
  title: "Bent-Arm Dumbbell Pullover",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Bent-Arm_Dumbbell_Pullover",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bent-Arm_Dumbbell_Pullover",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Dumbbell_Pullover/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent-Arm_Dumbbell_Pullover/0.jpg",
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
