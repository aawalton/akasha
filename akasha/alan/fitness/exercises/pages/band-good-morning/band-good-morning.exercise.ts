import type { Exercise } from "../../exercise.page-type.ts"

export const bandGoodMorning = {
  id: "019ebc76-1f65-7999-8dfa-8903913d9140",
  pageTypeSlug: "exercise",
  slug: "band-good-morning",
  title: "Band Good Morning",
  exerciseCategory: "powerlifting",
  equipment: "bands",
  exerciseExternalId: "Band_Good_Morning",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Band_Good_Morning",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Good_Morning/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Good_Morning/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
