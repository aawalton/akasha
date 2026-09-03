import type { Exercise } from "../../exercise.page-type.ts"

export const groiners = {
  id: "019ebc77-4ab3-7194-b9b1-07448eef4e35",
  pageTypeSlug: "exercise",
  slug: "groiners",
  title: "Groiners",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Groiners",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Groiners",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Groiners/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Groiners/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
