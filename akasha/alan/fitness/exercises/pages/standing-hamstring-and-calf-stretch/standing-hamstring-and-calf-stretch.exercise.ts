import type { Exercise } from "../../exercise.page-type.ts"

export const standingHamstringAndCalfStretch = {
  id: "019ebc78-88d1-7034-81cd-76e3892816cb",
  pageTypeSlug: "exercise",
  slug: "standing-hamstring-and-calf-stretch",
  title: "Standing Hamstring and Calf Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Standing_Hamstring_and_Calf_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Hamstring_and_Calf_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Hamstring_and_Calf_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Hamstring_and_Calf_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
