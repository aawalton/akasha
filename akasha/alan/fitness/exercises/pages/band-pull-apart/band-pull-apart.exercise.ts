import type { Exercise } from "../../exercise.page-type.ts"

export const bandPullApart = {
  id: "019ebc76-2022-7521-b369-5fd271f78b00",
  pageTypeSlug: "exercise",
  slug: "band-pull-apart",
  title: "Band Pull Apart",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Band_Pull_Apart",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Band_Pull_Apart",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Pull_Apart/0.jpg",
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
  secondaryMuscles: ["middle-back", "traps"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
