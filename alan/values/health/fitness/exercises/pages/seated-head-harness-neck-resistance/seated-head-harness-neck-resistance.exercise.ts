import type { Exercise } from "../../exercise.page-type.ts"

export const seatedHeadHarnessNeckResistance = {
  id: "019ebc78-5c6e-7311-9159-c6b162efc5e9",
  pageTypeSlug: "exercise",
  slug: "seated-head-harness-neck-resistance",
  title: "Seated Head Harness Neck Resistance",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Seated_Head_Harness_Neck_Resistance",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Head_Harness_Neck_Resistance",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Head_Harness_Neck_Resistance/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Head_Harness_Neck_Resistance/0.jpg",
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
