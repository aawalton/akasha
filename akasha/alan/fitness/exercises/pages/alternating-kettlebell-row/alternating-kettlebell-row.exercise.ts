import type { Exercise } from "../../exercise.page-type.ts"

export const alternatingKettlebellRow = {
  id: "019ebc75-c235-7a99-9c31-5153d0998f1d",
  pageTypeSlug: "exercise",
  slug: "alternating-kettlebell-row",
  title: "Alternating Kettlebell Row",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Alternating_Kettlebell_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Alternating_Kettlebell_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Kettlebell_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Kettlebell_Row/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "alternating",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
