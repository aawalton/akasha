import type { Exercise } from "../../exercise.page-type.ts"

export const squatWithPlateMovers = {
  id: "019ebc78-8078-7862-a372-8674b10ee396",
  pageTypeSlug: "exercise",
  slug: "squat-with-plate-movers",
  title: "Squat with Plate Movers",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Squat_with_Plate_Movers",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Squat_with_Plate_Movers",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Squat_with_Plate_Movers/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Squat_with_Plate_Movers/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "adductors", "calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
