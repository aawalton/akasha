import type { Exercise } from "../../exercise.page-type.ts"

export const frontSquatCleanGrip = {
  id: "019ebc77-438e-70d5-bbaf-716747519a7d",
  pageTypeSlug: "exercise",
  slug: "front-squat-clean-grip",
  title: "Front Squat (Clean Grip)",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Front_Squat_Clean_Grip",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Front_Squat_Clean_Grip",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Squat_Clean_Grip/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Squat_Clean_Grip/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "glutes", "hamstrings"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
