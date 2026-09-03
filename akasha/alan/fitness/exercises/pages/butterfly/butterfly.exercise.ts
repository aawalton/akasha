import type { Exercise } from "../../exercise.page-type.ts"

export const butterfly = {
  id: "019ebc76-b682-7a5a-a9a7-655eb97e3d52",
  pageTypeSlug: "exercise",
  slug: "butterfly",
  title: "Butterfly",
  exerciseCategory: "strength",
  equipment: "machine",
  exerciseExternalId: "Butterfly",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Butterfly",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Butterfly/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
