import type { Exercise } from "../../exercise.page-type.ts"

export const powerStairs = {
  id: "019ebc77-c493-79cd-af18-aa76afe039e9",
  pageTypeSlug: "exercise",
  slug: "power-stairs",
  title: "Power Stairs",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Power_Stairs",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Power_Stairs",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Power_Stairs/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Power_Stairs/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: [
    "adductors",
    "calves",
    "glutes",
    "lower-back",
    "quadriceps",
    "shoulders",
    "traps",
  ],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
