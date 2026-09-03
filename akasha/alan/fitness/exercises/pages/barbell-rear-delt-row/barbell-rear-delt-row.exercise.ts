import type { Exercise } from "../../exercise.page-type.ts"

export const barbellRearDeltRow = {
  id: "019ebc76-96ea-7bfd-9d06-a92caf1ab978",
  pageTypeSlug: "exercise",
  slug: "barbell-rear-delt-row",
  title: "Barbell Rear Delt Row",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Rear_Delt_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Rear_Delt_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Rear_Delt_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Rear_Delt_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats", "middle-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
