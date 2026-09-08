import type { Exercise } from "../../exercise.page-type.ts"

export const seatedHamstringAndCalfStretch = {
  id: "019ebc78-5c0f-7942-b43f-66b6a8be573b",
  pageTypeSlug: "exercise",
  slug: "seated-hamstring-and-calf-stretch",
  title: "Seated Hamstring and Calf Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Seated_Hamstring_and_Calf_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Hamstring_and_Calf_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Hamstring_and_Calf_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Hamstring_and_Calf_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  secondaryMuscles: ["calves"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
