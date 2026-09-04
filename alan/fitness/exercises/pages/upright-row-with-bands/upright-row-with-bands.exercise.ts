import type { Exercise } from "../../exercise.page-type.ts"

export const uprightRowWithBands = {
  id: "019ebc78-b307-752f-9dee-dd96f506a706",
  pageTypeSlug: "exercise",
  slug: "upright-row-with-bands",
  title: "Upright Row - With Bands",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Upright_Row_-_With_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Upright_Row_-_With_Bands",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Row_-_With_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Upright_Row_-_With_Bands/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["traps"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
