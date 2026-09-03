import type { Exercise } from "../../exercise.page-type.ts"

export const overheadSlam = {
  id: "019ebc77-bcfd-7fdf-84b3-231269103710",
  pageTypeSlug: "exercise",
  slug: "overhead-slam",
  title: "Overhead Slam",
  exerciseCategory: "plyometrics",
  equipment: "medicine-ball",
  exerciseExternalId: "Overhead_Slam",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Overhead_Slam",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Slam/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Overhead_Slam/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
