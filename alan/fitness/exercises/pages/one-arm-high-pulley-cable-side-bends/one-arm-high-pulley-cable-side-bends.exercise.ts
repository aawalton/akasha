import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmHighPulleyCableSideBends = {
  id: "019ebc77-b3d1-71d0-b392-fac7f0f0c297",
  pageTypeSlug: "exercise",
  slug: "one-arm-high-pulley-cable-side-bends",
  title: "One-Arm High-Pulley Cable Side Bends",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "One-Arm_High-Pulley_Cable_Side_Bends",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_High-Pulley_Cable_Side_Bends",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_High-Pulley_Cable_Side_Bends/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_High-Pulley_Cable_Side_Bends/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-lateral-flexion",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
