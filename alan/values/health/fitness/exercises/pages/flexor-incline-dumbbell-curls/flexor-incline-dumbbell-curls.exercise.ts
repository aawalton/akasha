import type { Exercise } from "../../exercise.page-type.ts"

export const flexorInclineDumbbellCurls = {
  id: "019ebc77-3c78-7848-b8a3-e84930279d3a",
  pageTypeSlug: "exercise",
  slug: "flexor-incline-dumbbell-curls",
  title: "Flexor Incline Dumbbell Curls",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Flexor_Incline_Dumbbell_Curls",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Flexor_Incline_Dumbbell_Curls",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flexor_Incline_Dumbbell_Curls/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Flexor_Incline_Dumbbell_Curls/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
