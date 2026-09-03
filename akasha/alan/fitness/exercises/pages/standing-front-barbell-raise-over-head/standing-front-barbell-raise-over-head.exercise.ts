import type { Exercise } from "../../exercise.page-type.ts"

export const standingFrontBarbellRaiseOverHead = {
  id: "019ebc78-863a-7b98-b181-c13aa4396869",
  pageTypeSlug: "exercise",
  slug: "standing-front-barbell-raise-over-head",
  title: "Standing Front Barbell Raise Over Head",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Standing_Front_Barbell_Raise_Over_Head",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Front_Barbell_Raise_Over_Head",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Front_Barbell_Raise_Over_Head/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Front_Barbell_Raise_Over_Head/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
