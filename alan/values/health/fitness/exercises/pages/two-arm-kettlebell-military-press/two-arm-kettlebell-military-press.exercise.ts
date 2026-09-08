import type { Exercise } from "../../exercise.page-type.ts"

export const twoArmKettlebellMilitaryPress = {
  id: "019ebc78-ae56-7478-83f7-8ca0d5d3e029",
  pageTypeSlug: "exercise",
  slug: "two-arm-kettlebell-military-press",
  title: "Two-Arm Kettlebell Military Press",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Two-Arm_Kettlebell_Military_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Two-Arm_Kettlebell_Military_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Kettlebell_Military_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Two-Arm_Kettlebell_Military_Press/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
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
