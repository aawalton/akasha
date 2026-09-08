import type { Exercise } from "../../exercise.page-type.ts"

export const crossoverReverseLunge = {
  id: "019ebc76-e01b-7b0b-a2e0-30eb935d4bec",
  pageTypeSlug: "exercise",
  slug: "crossover-reverse-lunge",
  title: "Crossover Reverse Lunge",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Crossover_Reverse_Lunge",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Crossover_Reverse_Lunge",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crossover_Reverse_Lunge/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Crossover_Reverse_Lunge/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "lunge",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps", "glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["hamstrings", "abductors", "abdominals"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
