import type { StrengthExercise } from "akasha/alan/value/health/fitness/strength/exercise/strength-exercise.page-type.types.ts"

export const spiderCrawl = {
  id: "019ebc78-7d7c-7526-9fe4-aaaaf74fa4a4",
  type: "page-type/strength-exercise",
  slug: "spider-crawl",
  title: "Spider Crawl",
  exerciseCategory: "strength",
  equipment: "strength-exercise-implement/body-only",
  exerciseExternalId: "Spider_Crawl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Spider_Crawl",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Spider_Crawl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Spider_Crawl/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "gait",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
  raisesCold: true,
} as const satisfies StrengthExercise
