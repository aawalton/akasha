import type { Exercise } from "../../exercise.page-type.ts"

export const oneLegBarbellSquat = {
  id: "019ebc77-bbc5-75aa-8d4a-dd391f52ace8",
  pageTypeSlug: "exercise",
  slug: "one-leg-barbell-squat",
  title: "One Leg Barbell Squat",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "One_Leg_Barbell_Squat",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One_Leg_Barbell_Squat",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Leg_Barbell_Squat/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Leg_Barbell_Squat/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
