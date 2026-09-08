import type { Exercise } from "../../exercise.page-type.ts"

export const dumbbellOneArmShoulderPress = {
  id: "019ebc77-1092-7e5d-830b-0f9dca8f5b02",
  pageTypeSlug: "exercise",
  slug: "dumbbell-one-arm-shoulder-press",
  title: "Dumbbell One-Arm Shoulder Press",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Dumbbell_One-Arm_Shoulder_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Dumbbell_One-Arm_Shoulder_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Shoulder_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_One-Arm_Shoulder_Press/0.jpg",
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
  secondaryMuscles: ["triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
