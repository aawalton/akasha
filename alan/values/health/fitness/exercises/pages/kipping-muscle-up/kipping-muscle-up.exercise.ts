import type { Exercise } from "../../exercise.page-type.ts"

export const kippingMuscleUp = {
  id: "019ebc77-86f2-72b9-9504-96e4ff5fc620",
  pageTypeSlug: "exercise",
  slug: "kipping-muscle-up",
  title: "Kipping Muscle Up",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Kipping_Muscle_Up",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kipping_Muscle_Up",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kipping_Muscle_Up/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kipping_Muscle_Up/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  secondaryMuscles: [
    "abdominals",
    "biceps",
    "forearms",
    "middle-back",
    "shoulders",
    "traps",
    "triceps",
  ],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
