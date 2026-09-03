import type { Exercise } from "../../exercise.page-type.ts"

export const depthJumpLeap = {
  id: "019ebc76-f121-77fe-b170-9c19e5e6a146",
  pageTypeSlug: "exercise",
  slug: "depth-jump-leap",
  title: "Depth Jump Leap",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Depth_Jump_Leap",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Depth_Jump_Leap",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Depth_Jump_Leap/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Depth_Jump_Leap/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
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
