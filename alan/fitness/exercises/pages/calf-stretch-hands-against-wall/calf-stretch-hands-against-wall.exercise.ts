import type { Exercise } from "../../exercise.page-type.ts"

export const calfStretchHandsAgainstWall = {
  id: "019ebc76-caef-75fe-9f01-017c8f6fcfe9",
  pageTypeSlug: "exercise",
  slug: "calf-stretch-hands-against-wall",
  title: "Calf Stretch Hands Against Wall",
  exerciseCategory: "stretching",
  exerciseExternalId: "Calf_Stretch_Hands_Against_Wall",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Calf_Stretch_Hands_Against_Wall",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Stretch_Hands_Against_Wall/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Stretch_Hands_Against_Wall/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "time",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
