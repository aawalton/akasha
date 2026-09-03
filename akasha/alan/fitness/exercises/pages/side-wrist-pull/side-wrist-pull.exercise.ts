import type { Exercise } from "../../exercise.page-type.ts"

export const sideWristPull = {
  id: "019ebc78-645d-70f4-aa16-5ce4c3aab70a",
  pageTypeSlug: "exercise",
  slug: "side-wrist-pull",
  title: "Side Wrist Pull",
  exerciseCategory: "stretching",
  exerciseExternalId: "Side_Wrist_Pull",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side_Wrist_Pull",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Wrist_Pull/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Wrist_Pull/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "time",
  secondaryMuscles: ["forearms", "lats"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
