import type { Exercise } from "../../exercise.page-type.ts"

export const lateralBoxJump = {
  id: "019ebc77-8b71-79fa-a742-5d52735f68bd",
  pageTypeSlug: "exercise",
  slug: "lateral-box-jump",
  title: "Lateral Box Jump",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Lateral_Box_Jump",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lateral_Box_Jump",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Box_Jump/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Box_Jump/0.jpg",
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
