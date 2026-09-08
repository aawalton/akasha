import type { Exercise } from "../../exercise.page-type.ts"

export const seatedCableShoulderPress = {
  id: "019ebc78-5528-7e2c-a5e5-bc1914510c82",
  pageTypeSlug: "exercise",
  slug: "seated-cable-shoulder-press",
  title: "Seated Cable Shoulder Press",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Seated_Cable_Shoulder_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Cable_Shoulder_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Shoulder_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Cable_Shoulder_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
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
