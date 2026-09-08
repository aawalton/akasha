import type { Exercise } from "../../exercise.page-type.ts"

export const kettlebellPassBetweenTheLegs = {
  id: "019ebc77-8476-7b9b-9cd6-7fd962fac286",
  pageTypeSlug: "exercise",
  slug: "kettlebell-pass-between-the-legs",
  title: "Kettlebell Pass Between The Legs",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Kettlebell_Pass_Between_The_Legs",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kettlebell_Pass_Between_The_Legs",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Pass_Between_The_Legs/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Pass_Between_The_Legs/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "hamstrings", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
