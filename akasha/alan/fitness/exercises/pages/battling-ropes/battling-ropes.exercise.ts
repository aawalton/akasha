import type { Exercise } from "../../exercise.page-type.ts"

export const battlingRopes = {
  id: "019ebc76-9d9f-7133-94ad-4f81903f74d7",
  pageTypeSlug: "exercise",
  slug: "battling-ropes",
  title: "Battling Ropes",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Battling_Ropes",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Battling_Ropes",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Battling_Ropes/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Battling_Ropes/0.jpg",
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
  secondaryMuscles: ["chest", "forearms"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
