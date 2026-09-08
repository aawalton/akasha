import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmMedicineBallSlam = {
  id: "019ebc77-b797-73ca-a6b6-9e724fd4b4e8",
  pageTypeSlug: "exercise",
  slug: "one-arm-medicine-ball-slam",
  title: "One-Arm Medicine Ball Slam",
  exerciseCategory: "strength",
  equipment: "medicine-ball",
  exerciseExternalId: "One-Arm_Medicine_Ball_Slam",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Medicine_Ball_Slam",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Medicine_Ball_Slam/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Medicine_Ball_Slam/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["lats", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
