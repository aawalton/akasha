import type { Exercise } from "../../exercise.page-type.ts"

export const wideGripStandingBarbellCurl = {
  id: "019ebc78-b91a-7b98-b9bc-5afa3eed5b4f",
  pageTypeSlug: "exercise",
  slug: "wide-grip-standing-barbell-curl",
  title: "Wide-Grip Standing Barbell Curl",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Wide-Grip_Standing_Barbell_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Wide-Grip_Standing_Barbell_Curl",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Standing_Barbell_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Standing_Barbell_Curl/0.jpg",
  implementCount: 1,
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
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
