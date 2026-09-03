import type { Exercise } from "../../exercise.page-type.ts"

export const rickshawDeadlift = {
  id: "019ebc77-d01e-7ffa-badf-560c050a35a0",
  pageTypeSlug: "exercise",
  slug: "rickshaw-deadlift",
  title: "Rickshaw Deadlift",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Rickshaw_Deadlift",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Rickshaw_Deadlift",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rickshaw_Deadlift/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rickshaw_Deadlift/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "glutes", "hamstrings", "lower-back", "traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
