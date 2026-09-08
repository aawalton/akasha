import type { Exercise } from "../../exercise.page-type.ts"

export const seatedFrontDeltoid = {
  id: "019ebc78-5819-7479-934f-2d770e1e26e0",
  pageTypeSlug: "exercise",
  slug: "seated-front-deltoid",
  title: "Seated Front Deltoid",
  exerciseCategory: "stretching",
  equipment: "body-only",
  exerciseExternalId: "Seated_Front_Deltoid",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Front_Deltoid",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Front_Deltoid/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Front_Deltoid/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "time",
  secondaryMuscles: ["chest"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
