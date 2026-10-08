import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const oneHandedHang = {
  id: "019ebc77-bb4d-7307-a677-071820c15f79",
  type: "page-type/strength-exercise",
  slug: "one-handed-hang",
  title: "One Handed Hang",
  exerciseCategory: "stretching",
  equipment: "strength-exercise-implement/other",
  exerciseExternalId: "One_Handed_Hang",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One_Handed_Hang",
  force: "static",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Handed_Hang/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Handed_Hang/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "time",
  secondaryMuscles: ["biceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:33:43.885Z",
  updatedAt: "2026-09-15T17:41:15.000Z",
} as const satisfies StrengthExercise
