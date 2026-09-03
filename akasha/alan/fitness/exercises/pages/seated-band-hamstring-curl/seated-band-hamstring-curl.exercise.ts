import type { Exercise } from "../../exercise.page-type.ts"

export const seatedBandHamstringCurl = {
  id: "019ebc77-d5fa-738b-87d9-acfaed9a1bf7",
  pageTypeSlug: "exercise",
  slug: "seated-band-hamstring-curl",
  title: "Seated Band Hamstring Curl",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Seated_Band_Hamstring_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Band_Hamstring_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Band_Hamstring_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Band_Hamstring_Curl/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
