import type { Exercise } from "../../exercise.page-type.ts"

export const verticalSwing = {
  id: "019ebc78-b41e-75cc-9d4e-e1075d358857",
  pageTypeSlug: "exercise",
  slug: "vertical-swing",
  title: "Vertical Swing",
  exerciseCategory: "plyometrics",
  equipment: "dumbbell",
  exerciseExternalId: "Vertical_Swing",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Vertical_Swing",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Vertical_Swing/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Vertical_Swing/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "quadriceps", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
