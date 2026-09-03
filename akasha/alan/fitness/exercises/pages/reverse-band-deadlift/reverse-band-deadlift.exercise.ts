import type { Exercise } from "../../exercise.page-type.ts"

export const reverseBandDeadlift = {
  id: "019ebc77-cbd7-795c-8503-ef3e2a621f7d",
  pageTypeSlug: "exercise",
  slug: "reverse-band-deadlift",
  title: "Reverse Band Deadlift",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Reverse_Band_Deadlift",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Reverse_Band_Deadlift",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Band_Deadlift/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Band_Deadlift/0.jpg",
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
  secondaryMuscles: ["abductors", "adductors", "calves", "glutes", "hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
