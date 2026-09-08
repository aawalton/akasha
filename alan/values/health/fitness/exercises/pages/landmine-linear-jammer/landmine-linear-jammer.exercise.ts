import type { Exercise } from "../../exercise.page-type.ts"

export const landmineLinearJammer = {
  id: "019ebc77-8af1-7b36-a4f5-381924cd88b5",
  pageTypeSlug: "exercise",
  slug: "landmine-linear-jammer",
  title: "Landmine Linear Jammer",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Landmine_Linear_Jammer",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Landmine_Linear_Jammer",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Landmine_Linear_Jammer/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Landmine_Linear_Jammer/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "core-anti-rotation",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "calves", "chest", "hamstrings", "quadriceps", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
