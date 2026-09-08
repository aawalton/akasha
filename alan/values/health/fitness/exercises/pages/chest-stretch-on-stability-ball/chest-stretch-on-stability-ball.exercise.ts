import type { Exercise } from "../../exercise.page-type.ts"

export const chestStretchOnStabilityBall = {
  id: "019ebc76-cf8e-75d8-8553-0081bbb698b2",
  pageTypeSlug: "exercise",
  slug: "chest-stretch-on-stability-ball",
  title: "Chest Stretch on Stability Ball",
  exerciseCategory: "stretching",
  equipment: "exercise-ball",
  exerciseExternalId: "Chest_Stretch_on_Stability_Ball",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Chest_Stretch_on_Stability_Ball",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Stretch_on_Stability_Ball/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_Stretch_on_Stability_Ball/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
