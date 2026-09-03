import type { Exercise } from "../../exercise.page-type.ts"

export const standingTowelTricepsExtension = {
  id: "019ebc78-a1e4-7c87-8c93-f1052fc74901",
  pageTypeSlug: "exercise",
  slug: "standing-towel-triceps-extension",
  title: "Standing Towel Triceps Extension",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Standing_Towel_Triceps_Extension",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Standing_Towel_Triceps_Extension",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Towel_Triceps_Extension/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Towel_Triceps_Extension/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
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
