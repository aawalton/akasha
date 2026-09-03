import type { Exercise } from "../../exercise.page-type.ts"

export const powerCleanFromBlocks = {
  id: "019ebc77-c35e-7ade-a5fa-72ab7833b27b",
  pageTypeSlug: "exercise",
  slug: "power-clean-from-blocks",
  title: "Power Clean from Blocks",
  exerciseCategory: "olympic-weightlifting",
  equipment: "barbell",
  exerciseExternalId: "Power_Clean_from_Blocks",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Power_Clean_from_Blocks",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Power_Clean_from_Blocks/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Power_Clean_from_Blocks/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["quadriceps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
