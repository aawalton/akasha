import type { Exercise } from "../../exercise.page-type.ts"

export const twoArmDumbbellPreacherCurl = {
  id: "019ebc78-ad91-7f3c-b6ba-ff7e74438cd5",
  pageTypeSlug: "exercise",
  slug: "two-arm-dumbbell-preacher-curl",
  title: "Two-Arm Dumbbell Preacher Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Two-Arm_Dumbbell_Preacher_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Two-Arm_Dumbbell_Preacher_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Dumbbell_Preacher_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Dumbbell_Preacher_Curl/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
