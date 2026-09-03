import type { Exercise } from "../../exercise.page-type.ts"

export const barbellSquat = {
  id: "019ebc76-9b89-786e-abde-b5fca58c9b45",
  pageTypeSlug: "exercise",
  slug: "barbell-squat",
  title: "Barbell Squat",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Squat",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Squat",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Squat/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings", "lower-back"],
  sfrScore: 2,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
