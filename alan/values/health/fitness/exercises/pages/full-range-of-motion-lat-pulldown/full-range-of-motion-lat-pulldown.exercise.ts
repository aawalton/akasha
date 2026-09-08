import type { Exercise } from "../../exercise.page-type.ts"

export const fullRangeOfMotionLatPulldown = {
  id: "019ebc77-4450-7d9c-955f-f9dd55e6fca9",
  pageTypeSlug: "exercise",
  slug: "full-range-of-motion-lat-pulldown",
  title: "Full Range-Of-Motion Lat Pulldown",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Full_Range-Of-Motion_Lat_Pulldown",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Full_Range-Of-Motion_Lat_Pulldown",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Full_Range-Of-Motion_Lat_Pulldown/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Full_Range-Of-Motion_Lat_Pulldown/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
