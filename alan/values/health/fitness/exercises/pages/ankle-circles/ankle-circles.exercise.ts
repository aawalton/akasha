import type { Exercise } from "../../exercise.page-type.ts"

export const ankleCircles = {
  id: "019ebc76-17f9-7603-b412-9bbc84cbc163",
  pageTypeSlug: "exercise",
  slug: "ankle-circles",
  title: "Ankle Circles",
  exerciseCategory: "stretching",
  exerciseExternalId: "Ankle_Circles",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Ankle_Circles",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ankle_Circles/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Ankle_Circles/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
