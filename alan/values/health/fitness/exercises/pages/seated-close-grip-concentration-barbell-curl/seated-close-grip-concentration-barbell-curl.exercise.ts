import type { Exercise } from "../../exercise.page-type.ts"

export const seatedCloseGripConcentrationBarbellCurl = {
  id: "019ebc78-55f6-7f4a-a0ea-2be1d0f4b8f1",
  pageTypeSlug: "exercise",
  slug: "seated-close-grip-concentration-barbell-curl",
  title: "Seated Close-Grip Concentration Barbell Curl",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Seated_Close-Grip_Concentration_Barbell_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Close-Grip_Concentration_Barbell_Curl",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Close-Grip_Concentration_Barbell_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Close-Grip_Concentration_Barbell_Curl/0.jpg",
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
