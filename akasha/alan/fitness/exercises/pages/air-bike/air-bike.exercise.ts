import type { Exercise } from "../../exercise.page-type.ts"

export const airBike = {
  id: "019ebc75-bf5f-7379-bb3c-34cb0bf73f7b",
  pageTypeSlug: "exercise",
  slug: "air-bike",
  title: "Air Bike",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Air_Bike",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Air_Bike",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Air_Bike/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Air_Bike/0.jpg",
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
