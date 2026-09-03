import type { Exercise } from "../../exercise.page-type.ts"

export const rackPulls = {
  id: "019ebc77-ca58-7dc5-baab-3866e71ef61b",
  pageTypeSlug: "exercise",
  slug: "rack-pulls",
  title: "Rack Pulls",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Rack_Pulls",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Rack_Pulls",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rack_Pulls/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rack_Pulls/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "glutes", "hamstrings", "traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
