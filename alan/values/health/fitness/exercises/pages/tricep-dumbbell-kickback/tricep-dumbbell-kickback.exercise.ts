import type { Exercise } from "../../exercise.page-type.ts"

export const tricepDumbbellKickback = {
  id: "019ebc78-ab79-7e19-9592-027d0182b5e7",
  pageTypeSlug: "exercise",
  slug: "tricep-dumbbell-kickback",
  title: "Tricep Dumbbell Kickback",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Tricep_Dumbbell_Kickback",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Tricep_Dumbbell_Kickback",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tricep_Dumbbell_Kickback/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Tricep_Dumbbell_Kickback/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
