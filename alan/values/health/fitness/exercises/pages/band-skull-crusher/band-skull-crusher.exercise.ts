import type { Exercise } from "../../exercise.page-type.ts"

export const bandSkullCrusher = {
  id: "019ebc76-205e-7533-bd06-be2a5b436c2a",
  pageTypeSlug: "exercise",
  slug: "band-skull-crusher",
  title: "Band Skull Crusher",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Band_Skull_Crusher",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Band_Skull_Crusher",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Skull_Crusher/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Skull_Crusher/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
