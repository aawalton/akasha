import type { Exercise } from "../../exercise.page-type.ts"

export const kettlebellTurkishGetUpSquatStyle = {
  id: "019ebc77-866d-7238-8d91-8d2e35f64152",
  pageTypeSlug: "exercise",
  slug: "kettlebell-turkish-get-up-squat-style",
  title: "Kettlebell Turkish Get-Up (Squat style)",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Kettlebell_Turkish_Get-Up_Squat_style",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kettlebell_Turkish_Get-Up_Squat_style",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Turkish_Get-Up_Squat_style/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Turkish_Get-Up_Squat_style/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "calves", "hamstrings", "quadriceps", "triceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
