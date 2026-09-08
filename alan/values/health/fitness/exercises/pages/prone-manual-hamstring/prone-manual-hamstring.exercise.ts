import type { Exercise } from "../../exercise.page-type.ts"

export const proneManualHamstring = {
  id: "019ebc77-c58a-7713-8f5a-9881bb9cbfa6",
  pageTypeSlug: "exercise",
  slug: "prone-manual-hamstring",
  title: "Prone Manual Hamstring",
  exerciseCategory: "strength",
  exerciseExternalId: "Prone_Manual_Hamstring",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Prone_Manual_Hamstring",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Prone_Manual_Hamstring/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Prone_Manual_Hamstring/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
