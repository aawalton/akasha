import type { Exercise } from "../../exercise.page-type.ts"

export const stomachVacuum = {
  id: "019ebc78-a421-71d7-8465-7a7c722ad8cd",
  pageTypeSlug: "exercise",
  slug: "stomach-vacuum",
  title: "Stomach Vacuum",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Stomach_Vacuum",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Stomach_Vacuum",
  force: "static",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stomach_Vacuum/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stomach_Vacuum/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
