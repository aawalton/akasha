import type { Exercise } from "../../exercise.page-type.ts"

export const standingOneArmCableCurl = {
  id: "019ebc78-9f17-7c1c-aad9-bd4e889e823a",
  pageTypeSlug: "exercise",
  slug: "standing-one-arm-cable-curl",
  title: "Standing One-Arm Cable Curl",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Standing_One-Arm_Cable_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_One-Arm_Cable_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_One-Arm_Cable_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_One-Arm_Cable_Curl/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
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
