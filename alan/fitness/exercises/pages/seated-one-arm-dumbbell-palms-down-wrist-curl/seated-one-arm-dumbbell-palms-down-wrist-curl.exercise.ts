import type { Exercise } from "../../exercise.page-type.ts"

export const seatedOneArmDumbbellPalmsDownWristCurl = {
  id: "019ebc78-5d33-72c0-bb6e-aafde780195c",
  pageTypeSlug: "exercise",
  slug: "seated-one-arm-dumbbell-palms-down-wrist-curl",
  title: "Seated One-Arm Dumbbell Palms-Down Wrist Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
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
