import type { Exercise } from "../../exercise.page-type.ts"

export const elbowToKnee = {
  id: "019ebc77-2e04-7fb1-afd4-9ce1f048cdb1",
  pageTypeSlug: "exercise",
  slug: "elbow-to-knee",
  title: "Elbow to Knee",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Elbow_to_Knee",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Elbow_to_Knee",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elbow_to_Knee/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Elbow_to_Knee/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
