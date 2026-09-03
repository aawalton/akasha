import type { Exercise } from "../../exercise.page-type.ts"

export const lyingBentLegGroin = {
  id: "019ebc77-92f6-7aa6-b6b9-e3b1d7dfa05a",
  pageTypeSlug: "exercise",
  slug: "lying-bent-leg-groin",
  title: "Lying Bent Leg Groin",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Lying_Bent_Leg_Groin",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lying_Bent_Leg_Groin",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Bent_Leg_Groin/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lying_Bent_Leg_Groin/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "time",
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
