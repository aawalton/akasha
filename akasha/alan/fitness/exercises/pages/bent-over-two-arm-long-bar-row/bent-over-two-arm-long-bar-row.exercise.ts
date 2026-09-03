import type { Exercise } from "../../exercise.page-type.ts"

export const bentOverTwoArmLongBarRow = {
  id: "019ebc76-a349-7df0-b9d6-2653749de3e0",
  pageTypeSlug: "exercise",
  slug: "bent-over-two-arm-long-bar-row",
  title: "Bent Over Two-Arm Long Bar Row",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Bent_Over_Two-Arm_Long_Bar_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bent_Over_Two-Arm_Long_Bar_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Two-Arm_Long_Bar_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Two-Arm_Long_Bar_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
