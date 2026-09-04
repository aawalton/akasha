import type { Exercise } from "../../exercise.page-type.ts"

export const crunchHandsOverhead = {
  id: "019ebc76-e090-7ab5-92b2-9da26135f225",
  pageTypeSlug: "exercise",
  slug: "crunch-hands-overhead",
  title: "Crunch - Hands Overhead",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Crunch_-_Hands_Overhead",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Crunch_-_Hands_Overhead",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunch_-_Hands_Overhead/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunch_-_Hands_Overhead/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
