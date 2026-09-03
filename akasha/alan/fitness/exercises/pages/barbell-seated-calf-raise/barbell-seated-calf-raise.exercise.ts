import type { Exercise } from "../../exercise.page-type.ts"

export const barbellSeatedCalfRaise = {
  id: "019ebc76-9771-73e7-a921-dd56e6221e45",
  pageTypeSlug: "exercise",
  slug: "barbell-seated-calf-raise",
  title: "Barbell Seated Calf Raise",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Barbell_Seated_Calf_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Barbell_Seated_Calf_Raise",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Seated_Calf_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Seated_Calf_Raise/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
