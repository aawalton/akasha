import type { Exercise } from "../../exercise.page-type.ts"

export const kneelingCableTricepsExtension = {
  id: "019ebc77-88a8-7eda-9ae5-c74a96a1c198",
  pageTypeSlug: "exercise",
  slug: "kneeling-cable-triceps-extension",
  title: "Kneeling Cable Triceps Extension",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Kneeling_Cable_Triceps_Extension",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kneeling_Cable_Triceps_Extension",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Cable_Triceps_Extension/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Cable_Triceps_Extension/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
