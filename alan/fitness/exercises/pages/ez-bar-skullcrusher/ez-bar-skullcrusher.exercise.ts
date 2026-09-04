import type { Exercise } from "../../exercise.page-type.ts"

export const ezBarSkullcrusher = {
  id: "019ebc77-2d2d-70d4-9355-6a5c66bdc131",
  pageTypeSlug: "exercise",
  slug: "ez-bar-skullcrusher",
  title: "EZ-Bar Skullcrusher",
  exerciseCategory: "strength",
  equipment: "e-z-curl-bar",
  exerciseExternalId: "EZ-Bar_Skullcrusher",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/EZ-Bar_Skullcrusher",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Skullcrusher/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/EZ-Bar_Skullcrusher/0.jpg",
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
  secondaryMuscles: ["forearms"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
