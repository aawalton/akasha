import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const depthJumpLeap = {
  id: "019ebc76-f121-77fe-b170-9c19e5e6a146",
  type: "page-type/strength-exercise",
  slug: "depth-jump-leap",
  title: "Depth Jump Leap",
  exerciseCategory: "plyometrics",
  equipment: "strength-exercise-implement/other",
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
  createdAt: "2026-06-12T15:32:52.129Z",
  updatedAt: "2026-09-15T17:40:49.000Z",
} as const satisfies StrengthExercise
