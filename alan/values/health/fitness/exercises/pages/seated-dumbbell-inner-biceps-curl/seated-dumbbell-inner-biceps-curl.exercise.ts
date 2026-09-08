import type { Exercise } from "../../exercise.page-type.ts"

export const seatedDumbbellInnerBicepsCurl = {
  id: "019ebc78-5694-7698-9905-06257ee0d87c",
  pageTypeSlug: "exercise",
  slug: "seated-dumbbell-inner-biceps-curl",
  title: "Seated Dumbbell Inner Biceps Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Seated_Dumbbell_Inner_Biceps_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Dumbbell_Inner_Biceps_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Dumbbell_Inner_Biceps_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Dumbbell_Inner_Biceps_Curl/0.jpg",
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
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
