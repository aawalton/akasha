import type { Exercise } from "../../exercise.page-type.ts"

export const backwardDrag = {
  id: "019ebc76-1b9f-7039-9684-16652f71b204",
  pageTypeSlug: "exercise",
  slug: "backward-drag",
  title: "Backward Drag",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Backward_Drag",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Backward_Drag",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Backward_Drag/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Backward_Drag/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "forearms", "glutes", "hamstrings", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
