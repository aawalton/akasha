import type { Exercise } from "../../exercise.page-type.ts"

export const cariocaQuickStep = {
  id: "019ebc76-cbe1-7044-a957-61c8b26aac9f",
  pageTypeSlug: "exercise",
  slug: "carioca-quick-step",
  title: "Carioca Quick Step",
  exerciseCategory: "plyometrics",
  exerciseExternalId: "Carioca_Quick_Step",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Carioca_Quick_Step",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Carioca_Quick_Step/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Carioca_Quick_Step/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "abductors", "calves", "glutes", "hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
