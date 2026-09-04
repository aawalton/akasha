import type { Exercise } from "../../exercise.page-type.ts"

export const cableHammerCurlsRopeAttachment = {
  id: "019ebc76-b7b7-77fa-8451-fe19684fc7a9",
  pageTypeSlug: "exercise",
  slug: "cable-hammer-curls-rope-attachment",
  title: "Cable Hammer Curls - Rope Attachment",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Cable_Hammer_Curls_-_Rope_Attachment",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Hammer_Curls_-_Rope_Attachment/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
