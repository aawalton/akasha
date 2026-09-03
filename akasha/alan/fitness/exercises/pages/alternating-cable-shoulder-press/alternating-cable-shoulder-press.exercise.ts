import type { Exercise } from "../../exercise.page-type.ts"

export const alternatingCableShoulderPress = {
  id: "019ebc75-c0ea-7145-b5bc-6ae22d380a29",
  pageTypeSlug: "exercise",
  slug: "alternating-cable-shoulder-press",
  title: "Alternating Cable Shoulder Press",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Alternating_Cable_Shoulder_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Alternating_Cable_Shoulder_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Cable_Shoulder_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Cable_Shoulder_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "alternating",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["triceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
