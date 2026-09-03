import type { Exercise } from "../../exercise.page-type.ts"

export const seeSawPressAlternatingSidePress = {
  id: "019ebc78-6002-7275-b4b0-ebc9d1293f52",
  pageTypeSlug: "exercise",
  slug: "see-saw-press-alternating-side-press",
  title: "See-Saw Press (Alternating Side Press)",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "See-Saw_Press_Alternating_Side_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/See-Saw_Press_Alternating_Side_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/See-Saw_Press_Alternating_Side_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/See-Saw_Press_Alternating_Side_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "alternating",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
