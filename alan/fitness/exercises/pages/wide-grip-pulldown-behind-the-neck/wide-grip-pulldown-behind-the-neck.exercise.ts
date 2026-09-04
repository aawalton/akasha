import type { Exercise } from "../../exercise.page-type.ts"

export const wideGripPulldownBehindTheNeck = {
  id: "019ebc78-b89f-72fb-8e07-02c0902baeab",
  pageTypeSlug: "exercise",
  slug: "wide-grip-pulldown-behind-the-neck",
  title: "Wide-Grip Pulldown Behind The Neck",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Wide-Grip_Pulldown_Behind_The_Neck",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Wide-Grip_Pulldown_Behind_The_Neck",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Pulldown_Behind_The_Neck/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Pulldown_Behind_The_Neck/0.jpg",
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
