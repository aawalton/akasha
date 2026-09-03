import type { Exercise } from "../../exercise.page-type.ts"

export const lateralRaiseWithBands = {
  id: "019ebc77-8be8-7f8a-b5b3-da23a519ee5f",
  pageTypeSlug: "exercise",
  slug: "lateral-raise-with-bands",
  title: "Lateral Raise - With Bands",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Lateral_Raise_-_With_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lateral_Raise_-_With_Bands",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Raise_-_With_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Raise_-_With_Bands/0.jpg",
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
