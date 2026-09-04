import type { Exercise } from "../../exercise.page-type.ts"

export const hipFlexionWithBand = {
  id: "019ebc77-764d-71d0-8eec-64b6f9341c32",
  pageTypeSlug: "exercise",
  slug: "hip-flexion-with-band",
  title: "Hip Flexion with Band",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Hip_Flexion_with_Band",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Hip_Flexion_with_Band",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Flexion_with_Band/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Flexion_with_Band/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
