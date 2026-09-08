import type { Exercise } from "../../exercise.page-type.ts"

export const pelvicTiltIntoBridge = {
  id: "019ebc77-bfb9-760a-a9b1-3a400de9eef0",
  pageTypeSlug: "exercise",
  slug: "pelvic-tilt-into-bridge",
  title: "Pelvic Tilt Into Bridge",
  exerciseCategory: "stretching",
  exerciseExternalId: "Pelvic_Tilt_Into_Bridge",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Pelvic_Tilt_Into_Bridge",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pelvic_Tilt_Into_Bridge/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pelvic_Tilt_Into_Bridge/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "mobility",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
