import type { Exercise } from "../../exercise.page-type.ts"

export const doubleKettlebellPushPress = {
  id: "019ebc76-f2bc-7cb3-adb3-c102e593029e",
  pageTypeSlug: "exercise",
  slug: "double-kettlebell-push-press",
  title: "Double Kettlebell Push Press",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Double_Kettlebell_Push_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Double_Kettlebell_Push_Press",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Double_Kettlebell_Push_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Double_Kettlebell_Push_Press/0.jpg",
  implementCount: 2,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "quadriceps", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
