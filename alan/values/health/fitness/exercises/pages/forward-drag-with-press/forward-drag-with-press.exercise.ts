import type { Exercise } from "../../exercise.page-type.ts"

export const forwardDragWithPress = {
  id: "019ebc77-3f71-7716-8a63-c7acf8124e97",
  pageTypeSlug: "exercise",
  slug: "forward-drag-with-press",
  title: "Forward Drag with Press",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Forward_Drag_with_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Forward_Drag_with_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Forward_Drag_with_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Forward_Drag_with_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings", "quadriceps", "shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
