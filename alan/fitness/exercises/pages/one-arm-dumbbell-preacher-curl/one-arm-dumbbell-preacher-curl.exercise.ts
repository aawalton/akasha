import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmDumbbellPreacherCurl = {
  id: "019ebc77-b9cd-7fcb-9635-364f29a4ac5c",
  pageTypeSlug: "exercise",
  slug: "one-arm-dumbbell-preacher-curl",
  title: "One Arm Dumbbell Preacher Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "One_Arm_Dumbbell_Preacher_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One_Arm_Dumbbell_Preacher_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Arm_Dumbbell_Preacher_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Arm_Dumbbell_Preacher_Curl/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
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
