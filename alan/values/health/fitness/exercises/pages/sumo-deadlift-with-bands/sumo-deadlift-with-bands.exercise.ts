import type { Exercise } from "../../exercise.page-type.ts"

export const sumoDeadliftWithBands = {
  id: "019ebc78-a5e2-7e2c-857d-f3ab631c11b5",
  pageTypeSlug: "exercise",
  slug: "sumo-deadlift-with-bands",
  title: "Sumo Deadlift with Bands",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Sumo_Deadlift_with_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Sumo_Deadlift_with_Bands",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sumo_Deadlift_with_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Sumo_Deadlift_with_Bands/0.jpg",
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
