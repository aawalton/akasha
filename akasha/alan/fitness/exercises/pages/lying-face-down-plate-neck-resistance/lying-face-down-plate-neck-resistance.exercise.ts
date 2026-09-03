import type { Exercise } from "../../exercise.page-type.ts"

export const lyingFaceDownPlateNeckResistance = {
  id: "019ebc77-9675-7fb4-b659-8504bf30c620",
  pageTypeSlug: "exercise",
  slug: "lying-face-down-plate-neck-resistance",
  title: "Lying Face Down Plate Neck Resistance",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Lying_Face_Down_Plate_Neck_Resistance",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Face_Down_Plate_Neck_Resistance",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Face_Down_Plate_Neck_Resistance/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Face_Down_Plate_Neck_Resistance/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "other",
  primaryMuscles: ["neck"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
