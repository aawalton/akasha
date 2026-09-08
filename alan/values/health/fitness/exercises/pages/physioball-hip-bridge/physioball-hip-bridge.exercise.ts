import type { Exercise } from "../../exercise.page-type.ts"

export const physioballHipBridge = {
  id: "019ebc77-c06e-72b2-ba12-cf7810020637",
  pageTypeSlug: "exercise",
  slug: "physioball-hip-bridge",
  title: "Physioball Hip Bridge",
  exerciseCategory: "strength",
  equipment: "exercise-ball",
  exerciseExternalId: "Physioball_Hip_Bridge",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Physioball_Hip_Bridge",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Physioball_Hip_Bridge/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Physioball_Hip_Bridge/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.5,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["glutes"],
  scoringMode: "reps",
  secondaryMuscles: ["hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
