import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const calfPress = {
  id: "019ebc76-c57f-7fe0-b317-19b69480cbb7",
  type: "page-type/strength-exercise",
  slug: "calf-press",
  title: "Calf Press",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/machine",
  exerciseExternalId: "Calf_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Calf_Press",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:32:40.959Z",
  updatedAt: "2026-09-15T17:40:26.000Z",
} as const satisfies StrengthExercise
