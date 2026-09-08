import type { Exercise } from "../../exercise.page-type.ts"

export const monsterWalk = {
  id: "019ebc77-9c5e-7151-af24-431f72460c43",
  pageTypeSlug: "exercise",
  slug: "monster-walk",
  title: "Monster Walk",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Monster_Walk",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Monster_Walk",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Monster_Walk/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Monster_Walk/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "gait",
  muscleFocus: "legs",
  primaryMuscles: ["abductors"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
