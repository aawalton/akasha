import type { Exercise } from "../../exercise.page-type.ts"

export const palmsUpBarbellWristCurlOverABench = {
  id: "019ebc77-befc-702a-80f6-a5aef7900636",
  pageTypeSlug: "exercise",
  slug: "palms-up-barbell-wrist-curl-over-a-bench",
  title: "Palms-Up Barbell Wrist Curl Over A Bench",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Palms-Up_Barbell_Wrist_Curl_Over_A_Bench",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Palms-Up_Barbell_Wrist_Curl_Over_A_Bench",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Up_Barbell_Wrist_Curl_Over_A_Bench/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Palms-Up_Barbell_Wrist_Curl_Over_A_Bench/0.jpg",
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
