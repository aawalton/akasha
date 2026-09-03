import type { Exercise } from "../../exercise.page-type.ts"

export const stepUpWithKneeRaise = {
  id: "019ebc78-a2cd-71ee-b673-c9627cbd5d18",
  pageTypeSlug: "exercise",
  slug: "step-up-with-knee-raise",
  title: "Step-up with Knee Raise",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Step-up_with_Knee_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Step-up_with_Knee_Raise",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Step-up_with_Knee_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Step-up_with_Knee_Raise/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "lunge",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
