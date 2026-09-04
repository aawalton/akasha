import type { Exercise } from "../../exercise.page-type.ts"

export const closeGripStandingBarbellCurl = {
  id: "019ebc76-de00-7aae-a22a-2852d077f065",
  pageTypeSlug: "exercise",
  slug: "close-grip-standing-barbell-curl",
  title: "Close-Grip Standing Barbell Curl",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Close-Grip_Standing_Barbell_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Close-Grip_Standing_Barbell_Curl",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Standing_Barbell_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Standing_Barbell_Curl/0.jpg",
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
  secondaryMuscles: ["forearms"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
