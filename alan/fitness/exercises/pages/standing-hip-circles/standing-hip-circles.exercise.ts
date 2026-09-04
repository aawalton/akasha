import type { Exercise } from "../../exercise.page-type.ts"

export const standingHipCircles = {
  id: "019ebc78-8913-706a-a32d-5432ff11282a",
  pageTypeSlug: "exercise",
  slug: "standing-hip-circles",
  title: "Standing Hip Circles",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Standing_Hip_Circles",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Hip_Circles",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Hip_Circles/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Hip_Circles/0.jpg",
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
