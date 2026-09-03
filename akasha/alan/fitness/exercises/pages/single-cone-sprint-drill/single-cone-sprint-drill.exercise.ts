import type { Exercise } from "../../exercise.page-type.ts"

export const singleConeSprintDrill = {
  id: "019ebc78-65a3-701d-95d0-a518a196332e",
  pageTypeSlug: "exercise",
  slug: "single-cone-sprint-drill",
  title: "Single-Cone Sprint Drill",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Single-Cone_Sprint_Drill",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Single-Cone_Sprint_Drill",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Cone_Sprint_Drill/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Single-Cone_Sprint_Drill/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "gait",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
