import type { Exercise } from "../../exercise.page-type.ts"

export const barbellSideSplitSquat = {
  id: "019ebc76-9b3d-7e7e-bd0d-d05fef8e8b15",
  pageTypeSlug: "exercise",
  slug: "barbell-side-split-squat",
  title: "Barbell Side Split Squat",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Side_Split_Squat",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Side_Split_Squat",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Side_Split_Squat/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Side_Split_Squat/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "lunge",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "hamstrings", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
