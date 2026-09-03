import type { Exercise } from "../../exercise.page-type.ts"

export const barbellShrugBehindTheBack = {
  id: "019ebc76-9abc-738f-b02e-30b9feb60273",
  pageTypeSlug: "exercise",
  slug: "barbell-shrug-behind-the-back",
  title: "Barbell Shrug Behind The Back",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Shrug_Behind_The_Back",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Shrug_Behind_The_Back",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shrug_Behind_The_Back/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Shrug_Behind_The_Back/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["traps"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "middle-back"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
