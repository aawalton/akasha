import type { Exercise } from "../../exercise.page-type.ts"

export const legPullIn = {
  id: "019ebc77-8db9-7401-a37e-80ee6c6eb114",
  pageTypeSlug: "exercise",
  slug: "leg-pull-in",
  title: "Leg Pull-In",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Leg_Pull-In",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Leg_Pull-In",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Pull-In/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg_Pull-In/0.jpg",
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
