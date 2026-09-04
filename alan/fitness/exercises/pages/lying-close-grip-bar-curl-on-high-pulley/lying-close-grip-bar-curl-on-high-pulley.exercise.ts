import type { Exercise } from "../../exercise.page-type.ts"

export const lyingCloseGripBarCurlOnHighPulley = {
  id: "019ebc77-93a9-76f0-8e72-2472dead1251",
  pageTypeSlug: "exercise",
  slug: "lying-close-grip-bar-curl-on-high-pulley",
  title: "Lying Close-Grip Bar Curl On High Pulley",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Lying_Close-Grip_Bar_Curl_On_High_Pulley",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Close-Grip_Bar_Curl_On_High_Pulley",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Close-Grip_Bar_Curl_On_High_Pulley/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Close-Grip_Bar_Curl_On_High_Pulley/0.jpg",
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
