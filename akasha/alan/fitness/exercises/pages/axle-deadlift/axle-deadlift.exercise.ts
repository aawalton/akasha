import type { Exercise } from "../../exercise.page-type.ts"

export const axleDeadlift = {
  id: "019ebc76-1b11-7791-afc2-5cf5717de4a7",
  pageTypeSlug: "exercise",
  slug: "axle-deadlift",
  title: "Axle Deadlift",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Axle_Deadlift",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Axle_Deadlift",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Axle_Deadlift/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Axle_Deadlift/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "glutes", "hamstrings", "middle-back", "quadriceps", "traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
