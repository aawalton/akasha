import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmSupinatedDumbbellTricepsExtension = {
  id: "019ebc77-bad3-7a1d-9f5a-dc797831ec92",
  pageTypeSlug: "exercise",
  slug: "one-arm-supinated-dumbbell-triceps-extension",
  title: "One Arm Supinated Dumbbell Triceps Extension",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "One_Arm_Supinated_Dumbbell_Triceps_Extension",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One_Arm_Supinated_Dumbbell_Triceps_Extension",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Arm_Supinated_Dumbbell_Triceps_Extension/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Arm_Supinated_Dumbbell_Triceps_Extension/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
