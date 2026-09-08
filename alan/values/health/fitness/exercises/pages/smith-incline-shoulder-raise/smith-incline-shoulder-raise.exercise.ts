import type { Exercise } from "../../exercise.page-type.ts"

export const smithInclineShoulderRaise = {
  id: "019ebc78-6b23-7488-adbe-b33f9b21d68f",
  pageTypeSlug: "exercise",
  slug: "smith-incline-shoulder-raise",
  title: "Smith Incline Shoulder Raise",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Smith_Incline_Shoulder_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Smith_Incline_Shoulder_Raise",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Incline_Shoulder_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Incline_Shoulder_Raise/0.jpg",
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
  secondaryMuscles: ["chest"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
