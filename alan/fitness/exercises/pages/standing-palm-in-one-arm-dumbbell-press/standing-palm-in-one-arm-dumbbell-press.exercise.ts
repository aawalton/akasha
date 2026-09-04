import type { Exercise } from "../../exercise.page-type.ts"

export const standingPalmInOneArmDumbbellPress = {
  id: "019ebc78-a013-7514-b6bc-6dda13ddbeda",
  pageTypeSlug: "exercise",
  slug: "standing-palm-in-one-arm-dumbbell-press",
  title: "Standing Palm-In One-Arm Dumbbell Press",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Standing_Palm-In_One-Arm_Dumbbell_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Palm-In_One-Arm_Dumbbell_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Palm-In_One-Arm_Dumbbell_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Palm-In_One-Arm_Dumbbell_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
