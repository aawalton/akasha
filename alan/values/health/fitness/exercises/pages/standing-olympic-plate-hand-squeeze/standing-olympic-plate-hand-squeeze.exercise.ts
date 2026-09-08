import type { Exercise } from "../../exercise.page-type.ts"

export const standingOlympicPlateHandSqueeze = {
  id: "019ebc78-8b54-7b68-8006-c1f7f7be0912",
  pageTypeSlug: "exercise",
  slug: "standing-olympic-plate-hand-squeeze",
  title: "Standing Olympic Plate Hand Squeeze",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Standing_Olympic_Plate_Hand_Squeeze",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Olympic_Plate_Hand_Squeeze",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Olympic_Plate_Hand_Squeeze/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Olympic_Plate_Hand_Squeeze/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["forearms"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
