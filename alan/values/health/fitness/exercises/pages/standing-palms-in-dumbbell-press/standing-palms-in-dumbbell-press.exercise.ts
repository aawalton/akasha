import type { Exercise } from "../../exercise.page-type.ts"

export const standingPalmsInDumbbellPress = {
  id: "019ebc78-a051-7f10-99f9-efd7b7b364eb",
  pageTypeSlug: "exercise",
  slug: "standing-palms-in-dumbbell-press",
  title: "Standing Palms-In Dumbbell Press",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Standing_Palms-In_Dumbbell_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Palms-In_Dumbbell_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Palms-In_Dumbbell_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Palms-In_Dumbbell_Press/0.jpg",
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
