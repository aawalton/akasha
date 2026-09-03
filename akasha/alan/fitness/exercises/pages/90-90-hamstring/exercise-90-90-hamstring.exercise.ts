import type { Exercise } from "../../exercise.page-type.ts"

export const exercise9090Hamstring = {
  id: "019ebc75-7a0a-7d23-a2f9-e3e05ddbfe83",
  pageTypeSlug: "exercise",
  slug: "exercise-90-90-hamstring",
  title: "90/90 Hamstring",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "90_90_Hamstring",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/90_90_Hamstring",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/90_90_Hamstring/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/90_90_Hamstring/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  secondaryMuscles: ["calves"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
