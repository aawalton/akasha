import type { Exercise } from "../../exercise.page-type.ts"

export const concentrationCurls = {
  id: "019ebc76-df2c-7fd9-8d6a-e7ee95ec252b",
  pageTypeSlug: "exercise",
  slug: "concentration-curls",
  title: "Concentration Curls",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Concentration_Curls",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Concentration_Curls",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Concentration_Curls/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Concentration_Curls/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
