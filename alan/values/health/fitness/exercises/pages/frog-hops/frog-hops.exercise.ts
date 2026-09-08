import type { Exercise } from "../../exercise.page-type.ts"

export const frogHops = {
  id: "019ebc77-4040-7307-8b01-6b1aaa100dbb",
  pageTypeSlug: "exercise",
  slug: "frog-hops",
  title: "Frog Hops",
  exerciseCategory: "stretching",
  exerciseExternalId: "Frog_Hops",
  exerciseExternalLink: "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Frog_Hops",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Frog_Hops/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Frog_Hops/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "time",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
