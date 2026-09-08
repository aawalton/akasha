import type { Exercise } from "../../exercise.page-type.ts"

export const seatedPalmsDownBarbellWristCurl = {
  id: "019ebc78-5efa-78f4-8d37-32a2423865ef",
  pageTypeSlug: "exercise",
  slug: "seated-palms-down-barbell-wrist-curl",
  title: "Seated Palms-Down Barbell Wrist Curl",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Seated_Palms-Down_Barbell_Wrist_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Palms-Down_Barbell_Wrist_Curl/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["forearms"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
