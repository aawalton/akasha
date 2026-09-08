import type { Exercise } from "../../exercise.page-type.ts"

export const seatedBentOverOneArmDumbbellTricepsExtension = {
  id: "019ebc78-53ee-7a70-91d6-4b89cee190d0",
  pageTypeSlug: "exercise",
  slug: "seated-bent-over-one-arm-dumbbell-triceps-extension",
  title: "Seated Bent-Over One-Arm Dumbbell Triceps Extension",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension/0.jpg",
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
