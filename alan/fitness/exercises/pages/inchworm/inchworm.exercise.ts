import type { Exercise } from "../../exercise.page-type.ts"

export const inchworm = {
  id: "019ebc77-78ae-76b9-af0d-4628a559d2b3",
  pageTypeSlug: "exercise",
  slug: "inchworm",
  title: "Inchworm",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Inchworm",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Inchworm",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inchworm/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Inchworm/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
