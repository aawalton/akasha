import type { Exercise } from "../../exercise.page-type.ts"

export const wideGripRearPullUp = {
  id: "019ebc78-b8da-7a95-a0ed-dd320e6ce4d2",
  pageTypeSlug: "exercise",
  slug: "wide-grip-rear-pull-up",
  title: "Wide-Grip Rear Pull-Up",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Wide-Grip_Rear_Pull-Up",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Wide-Grip_Rear_Pull-Up",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Rear_Pull-Up/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Rear_Pull-Up/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 1,
  mechanic: "compound",
  movementPattern: "v-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "middle-back", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
