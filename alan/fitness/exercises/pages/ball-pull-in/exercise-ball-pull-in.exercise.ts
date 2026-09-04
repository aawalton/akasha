import type { Exercise } from "../../exercise.page-type.ts"

export const exerciseBallPullIn = {
  id: "019ebc77-2fa3-7753-89cb-bf44112719b2",
  pageTypeSlug: "exercise",
  slug: "exercise-ball-pull-in",
  title: "Exercise Ball Pull-In",
  exerciseCategory: "strength",
  equipment: "exercise-ball",
  exerciseExternalId: "Exercise_Ball_Pull-In",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Exercise_Ball_Pull-In",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Exercise_Ball_Pull-In/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Exercise_Ball_Pull-In/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
