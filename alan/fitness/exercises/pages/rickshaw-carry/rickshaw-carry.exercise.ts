import type { Exercise } from "../../exercise.page-type.ts"

export const rickshawCarry = {
  id: "019ebc77-cfde-7299-827e-abf8e626ae77",
  pageTypeSlug: "exercise",
  slug: "rickshaw-carry",
  title: "Rickshaw Carry",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Rickshaw_Carry",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Rickshaw_Carry",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rickshaw_Carry/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rickshaw_Carry/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "carry",
  muscleFocus: "pull",
  primaryMuscles: ["forearms"],
  scoringMode: "time",
  secondaryMuscles: [
    "abdominals",
    "calves",
    "glutes",
    "hamstrings",
    "lower-back",
    "quadriceps",
    "traps",
  ],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
