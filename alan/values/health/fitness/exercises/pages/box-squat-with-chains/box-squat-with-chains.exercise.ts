import type { Exercise } from "../../exercise.page-type.ts"

export const boxSquatWithChains = {
  id: "019ebc76-ab08-7eb1-951b-611fb08ce5e7",
  pageTypeSlug: "exercise",
  slug: "box-squat-with-chains",
  title: "Box Squat with Chains",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Box_Squat_with_Chains",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Box_Squat_with_Chains",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Box_Squat_with_Chains/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Box_Squat_with_Chains/0.jpg",
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
  secondaryMuscles: ["abductors", "adductors", "calves", "glutes", "hamstrings", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
