import type { Exercise } from "../../exercise.page-type.ts"

export const stiffLeggedBarbellDeadlift = {
  id: "019ebc78-a356-762a-90ed-a99bf4de5e21",
  pageTypeSlug: "exercise",
  slug: "stiff-legged-barbell-deadlift",
  title: "Stiff-Legged Barbell Deadlift",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Stiff-Legged_Barbell_Deadlift",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Stiff-Legged_Barbell_Deadlift",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff-Legged_Barbell_Deadlift/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff-Legged_Barbell_Deadlift/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
