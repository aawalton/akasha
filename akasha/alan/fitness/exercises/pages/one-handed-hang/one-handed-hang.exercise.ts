import type { Exercise } from "../../exercise.page-type.ts"

export const oneHandedHang = {
  id: "019ebc77-bb4d-7307-a677-071820c15f79",
  pageTypeSlug: "exercise",
  slug: "one-handed-hang",
  title: "One Handed Hang",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "One_Handed_Hang",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One_Handed_Hang",
  force: "static",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Handed_Hang/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One_Handed_Hang/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "time",
  secondaryMuscles: ["biceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
