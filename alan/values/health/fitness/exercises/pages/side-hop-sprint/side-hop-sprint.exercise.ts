import type { Exercise } from "akasha/alan/values/health/fitness/exercises/exercise.page-type.types.ts"

export const sideHopSprint = {
  id: "019ebc78-622f-79be-91d6-0e89e9db6431",
  type: "exercise",
  slug: "side-hop-sprint",
  title: "Side Hop-Sprint",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Side_Hop-Sprint",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side_Hop-Sprint",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Hop-Sprint/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Hop-Sprint/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "gait",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "adductors", "calves", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
