import type { Exercise } from "../../exercise.page-type.ts"

export const vBarPullup = {
  id: "019ebc78-b3dc-7a1d-bd26-de190a0a5a0e",
  pageTypeSlug: "exercise",
  slug: "v-bar-pullup",
  title: "V-Bar Pullup",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "V-Bar_Pullup",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/V-Bar_Pullup",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/V-Bar_Pullup/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/V-Bar_Pullup/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 1,
  mechanic: "compound",
  movementPattern: "v-pull",
  muscleFocus: "pull",
  primaryMuscles: ["lats"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "middle-back", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
