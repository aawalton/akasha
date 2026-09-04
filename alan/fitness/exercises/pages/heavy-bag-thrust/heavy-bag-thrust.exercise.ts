import type { Exercise } from "../../exercise.page-type.ts"

export const heavyBagThrust = {
  id: "019ebc77-7552-74bb-86f7-6a9db5c11924",
  pageTypeSlug: "exercise",
  slug: "heavy-bag-thrust",
  title: "Heavy Bag Thrust",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Heavy_Bag_Thrust",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Heavy_Bag_Thrust",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Heavy_Bag_Thrust/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Heavy_Bag_Thrust/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
