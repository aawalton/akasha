import type { Exercise } from "../../exercise.page-type.ts"

export const tatePress = {
  id: "019ebc78-a950-79ee-93f2-54f59222234f",
  pageTypeSlug: "exercise",
  slug: "tate-press",
  title: "Tate Press",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Tate_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Tate_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tate_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tate_Press/0.jpg",
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
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
