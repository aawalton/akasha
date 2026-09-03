import type { Exercise } from "../../exercise.page-type.ts"

export const sumoDeadlift = {
  id: "019ebc78-a5a4-7170-91d3-6675fc37a296",
  pageTypeSlug: "exercise",
  slug: "sumo-deadlift",
  title: "Sumo Deadlift",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Sumo_Deadlift",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Sumo_Deadlift",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sumo_Deadlift/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sumo_Deadlift/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: [
    "adductors",
    "forearms",
    "glutes",
    "lower-back",
    "middle-back",
    "quadriceps",
    "traps",
  ],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
