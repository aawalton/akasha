import type { Exercise } from "../../exercise.page-type.ts"

export const worldsGreatestStretch = {
  id: "019ebc78-c200-7120-8d31-bb685b629d65",
  pageTypeSlug: "exercise",
  slug: "worlds-greatest-stretch",
  title: "World's Greatest Stretch",
  exerciseCategory: "stretching",
  exerciseExternalId: "Worlds_Greatest_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Worlds_Greatest_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Worlds_Greatest_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Worlds_Greatest_Stretch/0.jpg",
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
  secondaryMuscles: ["calves", "glutes", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
