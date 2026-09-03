import type { Exercise } from "../../exercise.page-type.ts"

export const wideGripLatPulldown = {
  id: "019ebc78-b85f-73fd-aecc-cbba825105ee",
  pageTypeSlug: "exercise",
  slug: "wide-grip-lat-pulldown",
  title: "Wide-Grip Lat Pulldown",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Wide-Grip_Lat_Pulldown",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Wide-Grip_Lat_Pulldown",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Lat_Pulldown/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "middle-back", "shoulders"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
