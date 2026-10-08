import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const wideStanceStiffLegs = {
  id: "019ebc78-c148-7587-a279-6fef81e4a2c8",
  type: "page-type/strength-exercise",
  slug: "wide-stance-stiff-legs",
  title: "Wide Stance Stiff Legs",
  exerciseCategory: "olympic-weightlifting",
  equipment: "strength-exercise-implement/barbell",
  exerciseExternalId: "Wide_Stance_Stiff_Legs",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Wide_Stance_Stiff_Legs",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide_Stance_Stiff_Legs/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide_Stance_Stiff_Legs/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["adductors", "glutes", "lower-back"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  createdAt: "2026-06-12T15:34:50.952Z",
  updatedAt: "2026-09-15T17:41:57.000Z",
} as const satisfies StrengthExercise
