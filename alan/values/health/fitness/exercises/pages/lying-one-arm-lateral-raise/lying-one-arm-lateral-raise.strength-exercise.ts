import type { StrengthExercise } from "akasha/alan/values/health/fitness/exercises/strength-exercise.page-type.types.ts"

export const lyingOneArmLateralRaise = {
  id: "019ebc77-9837-75a9-a19b-a37688b90dc5",
  type: "strength-exercise",
  slug: "lying-one-arm-lateral-raise",
  title: "Lying One-Arm Lateral Raise",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Lying_One-Arm_Lateral_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_One-Arm_Lateral_Raise",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_One-Arm_Lateral_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_One-Arm_Lateral_Raise/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
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
} as const satisfies StrengthExercise
