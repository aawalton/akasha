import type { Exercise } from "../../exercise.page-type.ts"

export const internalRotationWithBand = {
  id: "019ebc77-7f25-782a-9007-489893e8639a",
  pageTypeSlug: "exercise",
  slug: "internal-rotation-with-band",
  title: "Internal Rotation with Band",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Internal_Rotation_with_Band",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Internal_Rotation_with_Band",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Internal_Rotation_with_Band/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Internal_Rotation_with_Band/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
