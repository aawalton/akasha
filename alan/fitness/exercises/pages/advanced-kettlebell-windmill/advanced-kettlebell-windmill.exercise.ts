import type { Exercise } from "../../exercise.page-type.ts"

export const advancedKettlebellWindmill = {
  id: "019ebc75-bf1f-7673-8fd7-60b2720fd8b3",
  pageTypeSlug: "exercise",
  slug: "advanced-kettlebell-windmill",
  title: "Advanced Kettlebell Windmill",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Advanced_Kettlebell_Windmill",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Advanced_Kettlebell_Windmill",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Advanced_Kettlebell_Windmill/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Advanced_Kettlebell_Windmill/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-lateral-flexion",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings", "shoulders"],
  sfrScore: 4,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
