import type { Exercise } from "../../exercise.page-type.ts"

export const standingOneArmDumbbellCurlOverInclineBench = {
  id: "019ebc78-9f57-7de7-a0a7-38bef4731f03",
  pageTypeSlug: "exercise",
  slug: "standing-one-arm-dumbbell-curl-over-incline-bench",
  title: "Standing One-Arm Dumbbell Curl Over Incline Bench",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Standing_One-Arm_Dumbbell_Curl_Over_Incline_Bench",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_One-Arm_Dumbbell_Curl_Over_Incline_Bench",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_One-Arm_Dumbbell_Curl_Over_Incline_Bench/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_One-Arm_Dumbbell_Curl_Over_Incline_Bench/0.jpg",
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
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
