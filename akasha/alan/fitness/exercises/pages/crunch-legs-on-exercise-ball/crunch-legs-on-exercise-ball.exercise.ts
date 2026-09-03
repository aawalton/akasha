import type { Exercise } from "../../exercise.page-type.ts"

export const crunchLegsOnExerciseBall = {
  id: "019ebc76-e0ca-7daf-8e97-3d5e5c5e0aa8",
  pageTypeSlug: "exercise",
  slug: "crunch-legs-on-exercise-ball",
  title: "Crunch - Legs On Exercise Ball",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Crunch_-_Legs_On_Exercise_Ball",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Crunch_-_Legs_On_Exercise_Ball",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunch_-_Legs_On_Exercise_Ball/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crunch_-_Legs_On_Exercise_Ball/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
