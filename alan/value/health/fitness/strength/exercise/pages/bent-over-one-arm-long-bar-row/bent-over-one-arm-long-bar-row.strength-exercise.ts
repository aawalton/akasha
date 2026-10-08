import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const bentOverOneArmLongBarRow = {
  id: "019ebc76-a305-7c2d-83cc-d48ff5eb8208",
  type: "page-type/strength-exercise",
  slug: "bent-over-one-arm-long-bar-row",
  title: "Bent Over One-Arm Long Bar Row",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/barbell",
  exerciseExternalId: "Bent_Over_One-Arm_Long_Bar_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bent_Over_One-Arm_Long_Bar_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_One-Arm_Long_Bar_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_One-Arm_Long_Bar_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats", "lower-back", "traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:32:32.133Z",
  updatedAt: "2026-09-15T17:40:26.000Z",
} as const satisfies StrengthExercise
