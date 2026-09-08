import type { Exercise } from "../../exercise.page-type.ts"

export const seatedOneArmCablePulleyRows = {
  id: "019ebc78-5dee-7fa2-873a-b80282940ffb",
  pageTypeSlug: "exercise",
  slug: "seated-one-arm-cable-pulley-rows",
  title: "Seated One-arm Cable Pulley Rows",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Seated_One-arm_Cable_Pulley_Rows",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_One-arm_Cable_Pulley_Rows",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_One-arm_Cable_Pulley_Rows/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_One-arm_Cable_Pulley_Rows/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats", "traps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
