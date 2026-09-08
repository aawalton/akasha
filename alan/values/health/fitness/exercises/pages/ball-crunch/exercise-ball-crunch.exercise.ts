import type { Exercise } from "../../exercise.page-type.ts"

export const exerciseBallCrunch = {
  id: "019ebc77-2f5c-7cf9-ae5c-c07d61af041e",
  pageTypeSlug: "exercise",
  slug: "exercise-ball-crunch",
  title: "Exercise Ball Crunch",
  exerciseCategory: "strength",
  equipment: "exercise-ball",
  exerciseExternalId: "Exercise_Ball_Crunch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Exercise_Ball_Crunch",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Exercise_Ball_Crunch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Exercise_Ball_Crunch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
