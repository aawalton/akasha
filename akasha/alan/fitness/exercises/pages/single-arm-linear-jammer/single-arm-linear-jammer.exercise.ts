import type { Exercise } from "../../exercise.page-type.ts"

export const singleArmLinearJammer = {
  id: "019ebc78-651c-7e5b-a597-8ccfab2f946f",
  pageTypeSlug: "exercise",
  slug: "single-arm-linear-jammer",
  title: "Single-Arm Linear Jammer",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Single-Arm_Linear_Jammer",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single-Arm_Linear_Jammer",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Arm_Linear_Jammer/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Arm_Linear_Jammer/0.jpg",
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
  secondaryMuscles: ["chest", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
