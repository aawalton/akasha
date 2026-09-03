import type { Exercise } from "../../exercise.page-type.ts"

export const hipCirclesProne = {
  id: "019ebc77-75d1-7235-a5e1-e948d5130506",
  pageTypeSlug: "exercise",
  slug: "hip-circles-prone",
  title: "Hip Circles (prone)",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Hip_Circles_prone",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Hip_Circles_prone",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Circles_prone/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Circles_prone/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["abductors"],
  scoringMode: "time",
  secondaryMuscles: ["adductors"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
