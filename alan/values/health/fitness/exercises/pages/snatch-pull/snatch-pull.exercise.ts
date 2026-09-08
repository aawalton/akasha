import type { Exercise } from "../../exercise.page-type.ts"

export const snatchPull = {
  id: "019ebc78-7bcd-749d-bc81-818bd3a57447",
  pageTypeSlug: "exercise",
  slug: "snatch-pull",
  title: "Snatch Pull",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Snatch_Pull",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Snatch_Pull",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Snatch_Pull/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Snatch_Pull/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "lower-back", "quadriceps", "traps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
