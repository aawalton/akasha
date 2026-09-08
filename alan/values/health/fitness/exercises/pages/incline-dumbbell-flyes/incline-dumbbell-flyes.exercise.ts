import type { Exercise } from "../../exercise.page-type.ts"

export const inclineDumbbellFlyes = {
  id: "019ebc77-7a4b-7361-bdef-2b75b45e4117",
  pageTypeSlug: "exercise",
  slug: "incline-dumbbell-flyes",
  title: "Incline Dumbbell Flyes",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Incline_Dumbbell_Flyes",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Incline_Dumbbell_Flyes",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Flyes/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Incline_Dumbbell_Flyes/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
