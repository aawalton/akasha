import type { Exercise } from "../../exercise.page-type.ts"

export const wideGripDeclineBarbellPullover = {
  id: "019ebc78-b81f-76f9-ae91-3aa914d94ed6",
  pageTypeSlug: "exercise",
  slug: "wide-grip-decline-barbell-pullover",
  title: "Wide-Grip Decline Barbell Pullover",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Wide-Grip_Decline_Barbell_Pullover",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Wide-Grip_Decline_Barbell_Pullover",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Decline_Barbell_Pullover/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wide-Grip_Decline_Barbell_Pullover/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
