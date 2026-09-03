import type { Exercise } from "../../exercise.page-type.ts"

export const standingBarbellPressBehindNeck = {
  id: "019ebc78-81b7-7224-a646-1638f2bd6a6c",
  pageTypeSlug: "exercise",
  slug: "standing-barbell-press-behind-neck",
  title: "Standing Barbell Press Behind Neck",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Standing_Barbell_Press_Behind_Neck",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Barbell_Press_Behind_Neck",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Barbell_Press_Behind_Neck/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Barbell_Press_Behind_Neck/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
