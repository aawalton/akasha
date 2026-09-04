import type { Exercise } from "../../exercise.page-type.ts"

export const stiffLeggedDumbbellDeadlift = {
  id: "019ebc78-a395-7aac-b9df-5cc74b97a2c1",
  pageTypeSlug: "exercise",
  slug: "stiff-legged-dumbbell-deadlift",
  title: "Stiff-Legged Dumbbell Deadlift",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Stiff-Legged_Dumbbell_Deadlift",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Stiff-Legged_Dumbbell_Deadlift",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff-Legged_Dumbbell_Deadlift/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff-Legged_Dumbbell_Deadlift/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
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
