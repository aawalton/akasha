import type { Exercise } from "../../exercise.page-type.ts"

export const seatedTwoArmPalmsUpLowPulleyWristCurl = {
  id: "019ebc78-5fc2-78e7-b16e-08a6a5d9e463",
  pageTypeSlug: "exercise",
  slug: "seated-two-arm-palms-up-low-pulley-wrist-curl",
  title: "Seated Two-Arm Palms-Up Low-Pulley Wrist Curl",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl/0.jpg",
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
