import type { Exercise } from "../../exercise.page-type.ts"

export const rockyPullUpsPulldowns = {
  id: "019ebc77-d11d-7fe5-8a2d-45920aedbb7b",
  pageTypeSlug: "exercise",
  slug: "rocky-pull-ups-pulldowns",
  title: "Rocky Pull-Ups/Pulldowns",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Rocky_Pull-Ups_Pulldowns",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Rocky_Pull-Ups_Pulldowns",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rocky_Pull-Ups_Pulldowns/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rocky_Pull-Ups_Pulldowns/0.jpg",
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
  secondaryMuscles: ["biceps", "middle-back", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
