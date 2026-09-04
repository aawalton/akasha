import type { Exercise } from "../../exercise.page-type.ts"

export const obliqueCrunchesOnTheFloor = {
  id: "019ebc77-b247-7f8f-9987-2166bc66f0ed",
  pageTypeSlug: "exercise",
  slug: "oblique-crunches-on-the-floor",
  title: "Oblique Crunches - On The Floor",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Oblique_Crunches_-_On_The_Floor",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Oblique_Crunches_-_On_The_Floor",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Oblique_Crunches_-_On_The_Floor/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Oblique_Crunches_-_On_The_Floor/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-lateral-flexion",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
