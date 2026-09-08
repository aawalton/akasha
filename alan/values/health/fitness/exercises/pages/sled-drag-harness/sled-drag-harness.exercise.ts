import type { Exercise } from "../../exercise.page-type.ts"

export const sledDragHarness = {
  id: "019ebc78-6956-7b2b-8705-af9aa39c74ff",
  pageTypeSlug: "exercise",
  slug: "sled-drag-harness",
  title: "Sled Drag - Harness",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Sled_Drag_-_Harness",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Sled_Drag_-_Harness",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Drag_-_Harness/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Drag_-_Harness/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "gait",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
