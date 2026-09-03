import type { Exercise } from "../../exercise.page-type.ts"

export const narrowStanceSquats = {
  id: "019ebc77-b118-7833-9ebf-815382fed315",
  pageTypeSlug: "exercise",
  slug: "narrow-stance-squats",
  title: "Narrow Stance Squats",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Narrow_Stance_Squats",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Narrow_Stance_Squats",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Narrow_Stance_Squats/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Narrow_Stance_Squats/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
