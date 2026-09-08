import type { Exercise } from "../../exercise.page-type.ts"

export const hipLiftWithBand = {
  id: "019ebc77-7686-7945-9f68-3dbf683c8002",
  pageTypeSlug: "exercise",
  slug: "hip-lift-with-band",
  title: "Hip Lift with Band",
  exerciseCategory: "powerlifting",
  equipment: "bands",
  exerciseExternalId: "Hip_Lift_with_Band",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Hip_Lift_with_Band",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Lift_with_Band/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hip_Lift_with_Band/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
