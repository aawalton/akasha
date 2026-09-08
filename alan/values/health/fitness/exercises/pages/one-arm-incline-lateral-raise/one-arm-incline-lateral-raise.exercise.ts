import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmInclineLateralRaise = {
  id: "019ebc77-b40c-79f5-9311-2d19171fd49b",
  pageTypeSlug: "exercise",
  slug: "one-arm-incline-lateral-raise",
  title: "One-Arm Incline Lateral Raise",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "One-Arm_Incline_Lateral_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Incline_Lateral_Raise",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Incline_Lateral_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Incline_Lateral_Raise/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
