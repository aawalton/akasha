import type { Exercise } from "../../exercise.page-type.ts"

export const conansWheel = {
  id: "019ebc76-def1-7a4c-9f43-9c4f223fe60c",
  pageTypeSlug: "exercise",
  slug: "conans-wheel",
  title: "Conan's Wheel",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Conans_Wheel",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Conans_Wheel",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Conans_Wheel/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Conans_Wheel/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: [
    "abdominals",
    "biceps",
    "calves",
    "forearms",
    "lower-back",
    "shoulders",
    "traps",
  ],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
