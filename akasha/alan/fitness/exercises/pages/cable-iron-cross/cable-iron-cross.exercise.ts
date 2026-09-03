import type { Exercise } from "../../exercise.page-type.ts"

export const cableIronCross = {
  id: "019ebc76-b8f6-76bb-b275-8aa3fcdd8c65",
  pageTypeSlug: "exercise",
  slug: "cable-iron-cross",
  title: "Cable Iron Cross",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Cable_Iron_Cross",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Cable_Iron_Cross",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Iron_Cross/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Iron_Cross/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
