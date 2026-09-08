import type { Exercise } from "../../exercise.page-type.ts"

export const kneelingCableCrunchWithAlternatingObliqueTwists = {
  id: "019ebc77-8865-7c0e-98d3-f8d90bd38807",
  pageTypeSlug: "exercise",
  slug: "kneeling-cable-crunch-with-alternating-oblique-twists",
  title: "Kneeling Cable Crunch With Alternating Oblique Twists",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "alternating",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-lateral-flexion",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
