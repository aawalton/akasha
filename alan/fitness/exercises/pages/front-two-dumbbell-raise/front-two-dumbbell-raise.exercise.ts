import type { Exercise } from "../../exercise.page-type.ts"

export const frontTwoDumbbellRaise = {
  id: "019ebc77-4414-71a7-bcba-f3bb72db4db2",
  pageTypeSlug: "exercise",
  slug: "front-two-dumbbell-raise",
  title: "Front Two-Dumbbell Raise",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Front_Two-Dumbbell_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Front_Two-Dumbbell_Raise",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Two-Dumbbell_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Two-Dumbbell_Raise/0.jpg",
  implementCount: 2,
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
