import type { Exercise } from "../../exercise.page-type.ts"

export const seatedBentOverTwoArmDumbbellTricepsExtension = {
  id: "019ebc78-5465-7bda-bbcf-8f7837bb7c27",
  pageTypeSlug: "exercise",
  slug: "seated-bent-over-two-arm-dumbbell-triceps-extension",
  title: "Seated Bent-Over Two-Arm Dumbbell Triceps Extension",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
