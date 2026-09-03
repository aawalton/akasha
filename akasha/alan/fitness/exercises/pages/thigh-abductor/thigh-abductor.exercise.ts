import type { Exercise } from "../../exercise.page-type.ts"

export const thighAbductor = {
  id: "019ebc78-a9d1-7562-aafa-3bfa475043e7",
  pageTypeSlug: "exercise",
  slug: "thigh-abductor",
  title: "Thigh Abductor",
  exerciseCategory: "strength",
  equipment: "machine",
  exerciseExternalId: "Thigh_Abductor",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Thigh_Abductor",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Abductor/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Thigh_Abductor/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["abductors"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
