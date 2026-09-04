import type { Exercise } from "../../exercise.page-type.ts"

export const girondaSternumChins = {
  id: "019ebc77-4490-775f-8a33-6fe9790cb577",
  pageTypeSlug: "exercise",
  slug: "gironda-sternum-chins",
  title: "Gironda Sternum Chins",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Gironda_Sternum_Chins",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Gironda_Sternum_Chins",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Gironda_Sternum_Chins/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Gironda_Sternum_Chins/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "middle-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
