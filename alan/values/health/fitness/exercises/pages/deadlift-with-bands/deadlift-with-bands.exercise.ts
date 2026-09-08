import type { Exercise } from "../../exercise.page-type.ts"

export const deadliftWithBands = {
  id: "019ebc76-e212-781e-8a4e-34bf6da5a5e4",
  pageTypeSlug: "exercise",
  slug: "deadlift-with-bands",
  title: "Deadlift with Bands",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Deadlift_with_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Deadlift_with_Bands",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Deadlift_with_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Deadlift_with_Bands/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "glutes", "hamstrings", "middle-back", "quadriceps", "traps"],
  sfrScore: 2,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
