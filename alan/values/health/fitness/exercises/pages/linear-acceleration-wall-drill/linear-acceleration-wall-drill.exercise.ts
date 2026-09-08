import type { Exercise } from "../../exercise.page-type.ts"

export const linearAccelerationWallDrill = {
  id: "019ebc77-9034-7271-adf7-fd9e45947402",
  pageTypeSlug: "exercise",
  slug: "linear-acceleration-wall-drill",
  title: "Linear Acceleration Wall Drill",
  exerciseCategory: "plyometrics",
  exerciseExternalId: "Linear_Acceleration_Wall_Drill",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Linear_Acceleration_Wall_Drill",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Linear_Acceleration_Wall_Drill/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Linear_Acceleration_Wall_Drill/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
