import type { Exercise } from "../../exercise.page-type.ts"

export const lateralBound = {
  id: "019ebc77-8b35-7ee0-ba15-915197a9d185",
  pageTypeSlug: "exercise",
  slug: "lateral-bound",
  title: "Lateral Bound",
  exerciseCategory: "plyometrics",
  equipment: "body-only",
  exerciseExternalId: "Lateral_Bound",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lateral_Bound",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Bound/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Bound/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "calves", "glutes", "hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
