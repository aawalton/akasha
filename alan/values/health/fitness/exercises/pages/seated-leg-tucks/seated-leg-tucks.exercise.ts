import type { Exercise } from "../../exercise.page-type.ts"

export const seatedLegTucks = {
  id: "019ebc78-5cf0-7155-8e24-a67a412156ac",
  pageTypeSlug: "exercise",
  slug: "seated-leg-tucks",
  title: "Seated Leg Tucks",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Seated_Leg_Tucks",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Leg_Tucks",
  force: "pull",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Leg_Tucks/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Leg_Tucks/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
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
