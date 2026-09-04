import type { Exercise } from "../../exercise.page-type.ts"

export const stiffLegBarbellGoodMorning = {
  id: "019ebc78-a3db-7113-92f4-4dbbceaad39b",
  pageTypeSlug: "exercise",
  slug: "stiff-leg-barbell-good-morning",
  title: "Stiff Leg Barbell Good Morning",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Stiff_Leg_Barbell_Good_Morning",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Stiff_Leg_Barbell_Good_Morning",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff_Leg_Barbell_Good_Morning/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Stiff_Leg_Barbell_Good_Morning/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
