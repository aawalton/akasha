import type { Exercise } from "../../exercise.page-type.ts"

export const externalRotationWithCable = {
  id: "019ebc77-30b8-7e55-8750-4a30425eb5ee",
  pageTypeSlug: "exercise",
  slug: "external-rotation-with-cable",
  title: "External Rotation with Cable",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "External_Rotation_with_Cable",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/External_Rotation_with_Cable",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/External_Rotation_with_Cable/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/External_Rotation_with_Cable/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
