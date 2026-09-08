import type { Exercise } from "../../exercise.page-type.ts"

export const lungePassThrough = {
  id: "019ebc77-9283-758c-a0a4-9e37beafe69b",
  pageTypeSlug: "exercise",
  slug: "lunge-pass-through",
  title: "Lunge Pass Through",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Lunge_Pass_Through",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lunge_Pass_Through",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lunge_Pass_Through/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lunge_Pass_Through/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "lunge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
