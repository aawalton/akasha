import type { Exercise } from "../../exercise.page-type.ts"

export const singleArmPushUp = {
  id: "019ebc78-6561-7e78-936f-5d6996b30a26",
  pageTypeSlug: "exercise",
  slug: "single-arm-push-up",
  title: "Single-Arm Push-Up",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Single-Arm_Push-Up",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single-Arm_Push-Up",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Arm_Push-Up/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Arm_Push-Up/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.64,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
