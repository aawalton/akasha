import type { Exercise } from "../../exercise.page-type.ts"

export const alternateHeelTouchers = {
  id: "019ebc75-c02d-79bb-9f26-660f3eaeb8c4",
  pageTypeSlug: "exercise",
  slug: "alternate-heel-touchers",
  title: "Alternate Heel Touchers",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Alternate_Heel_Touchers",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Alternate_Heel_Touchers",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Heel_Touchers/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternate_Heel_Touchers/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "alternating",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
