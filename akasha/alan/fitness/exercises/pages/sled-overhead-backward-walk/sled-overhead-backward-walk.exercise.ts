import type { Exercise } from "../../exercise.page-type.ts"

export const sledOverheadBackwardWalk = {
  id: "019ebc78-6996-7024-81fa-072609c95555",
  pageTypeSlug: "exercise",
  slug: "sled-overhead-backward-walk",
  title: "Sled Overhead Backward Walk",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Sled_Overhead_Backward_Walk",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Sled_Overhead_Backward_Walk",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Overhead_Backward_Walk/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sled_Overhead_Backward_Walk/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "gait",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "middle-back", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
