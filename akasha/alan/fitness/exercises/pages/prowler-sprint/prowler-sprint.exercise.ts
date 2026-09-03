import type { Exercise } from "../../exercise.page-type.ts"

export const prowlerSprint = {
  id: "019ebc77-c5c5-7f83-a4e4-4de91f5d10c1",
  pageTypeSlug: "exercise",
  slug: "prowler-sprint",
  title: "Prowler Sprint",
  exerciseCategory: "cardio",
  equipment: "other",
  exerciseExternalId: "Prowler_Sprint",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Prowler_Sprint",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Prowler_Sprint/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Prowler_Sprint/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "conditioning",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "time",
  secondaryMuscles: ["calves", "chest", "glutes", "quadriceps", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
