import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const oneArmKettlebellMilitaryPressToTheSide = {
  id: "019ebc77-b54d-7780-ab8c-cd6b04838df9",
  type: "page-type/strength-exercise",
  slug: "one-arm-kettlebell-military-press-to-the-side",
  title: "One-Arm Kettlebell Military Press To The Side",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/kettlebells",
  exerciseExternalId: "One-Arm_Kettlebell_Military_Press_To_The_Side",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Kettlebell_Military_Press_To_The_Side",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Military_Press_To_The_Side/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Kettlebell_Military_Press_To_The_Side/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:42.349Z",
  updatedAt: "2026-09-15T17:41:15.000Z",
} as const satisfies StrengthExercise
