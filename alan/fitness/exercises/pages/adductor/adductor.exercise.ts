import type { Exercise } from "../../exercise.page-type.ts"

export const adductor = {
  id: "019ebc75-7b1f-7c79-bd5e-9b5a9919ce97",
  pageTypeSlug: "exercise",
  slug: "adductor",
  title: "Adductor",
  exerciseCategory: "stretching",
  equipment: "foam-roll",
  exerciseExternalId: "Adductor",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Adductor",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Adductor/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Adductor/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
