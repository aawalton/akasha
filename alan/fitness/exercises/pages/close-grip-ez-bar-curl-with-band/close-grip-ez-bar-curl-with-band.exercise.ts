import type { Exercise } from "../../exercise.page-type.ts"

export const closeGripEzBarCurlWithBand = {
  id: "019ebc76-dcbe-7a99-b009-c10fd3376fc6",
  pageTypeSlug: "exercise",
  slug: "close-grip-ez-bar-curl-with-band",
  title: "Close-Grip EZ-Bar Curl with Band",
  exerciseCategory: "strength",
  equipment: "e-z-curl-bar",
  exerciseExternalId: "Close-Grip_EZ-Bar_Curl_with_Band",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Close-Grip_EZ-Bar_Curl_with_Band",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_EZ-Bar_Curl_with_Band/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_EZ-Bar_Curl_with_Band/0.jpg",
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
