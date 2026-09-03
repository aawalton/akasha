import type { Exercise } from "../../exercise.page-type.ts"

export const chestAndFrontOfShoulderStretch = {
  id: "019ebc76-ce47-7569-bf5d-3b8f2bdb2fd1",
  pageTypeSlug: "exercise",
  slug: "chest-and-front-of-shoulder-stretch",
  title: "Chest And Front Of Shoulder Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Chest_And_Front_Of_Shoulder_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Chest_And_Front_Of_Shoulder_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_And_Front_Of_Shoulder_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chest_And_Front_Of_Shoulder_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "time",
  secondaryMuscles: ["shoulders"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
