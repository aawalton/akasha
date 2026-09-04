import type { Exercise } from "../../exercise.page-type.ts"

export const circusBell = {
  id: "019ebc76-d995-7e8b-be5b-dc4ccf57e5f1",
  pageTypeSlug: "exercise",
  slug: "circus-bell",
  title: "Circus Bell",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Circus_Bell",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Circus_Bell",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Circus_Bell/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Circus_Bell/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "glutes", "hamstrings", "lower-back", "traps", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
