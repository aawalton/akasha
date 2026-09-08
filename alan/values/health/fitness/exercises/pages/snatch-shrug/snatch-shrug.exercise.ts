import type { Exercise } from "../../exercise.page-type.ts"

export const snatchShrug = {
  id: "019ebc78-7c05-7ff3-a7f8-1bb30f499fc6",
  pageTypeSlug: "exercise",
  slug: "snatch-shrug",
  title: "Snatch Shrug",
  exerciseCategory: "olympic-weightlifting",
  equipment: "barbell",
  exerciseExternalId: "Snatch_Shrug",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Snatch_Shrug",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Snatch_Shrug/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Snatch_Shrug/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["traps"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "shoulders"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
