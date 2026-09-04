import type { Exercise } from "../../exercise.page-type.ts"

export const bandGoodMorningPullThrough = {
  id: "019ebc76-1fa4-7f35-a987-51407ee45b04",
  pageTypeSlug: "exercise",
  slug: "band-good-morning-pull-through",
  title: "Band Good Morning (Pull Through)",
  exerciseCategory: "powerlifting",
  equipment: "bands",
  exerciseExternalId: "Band_Good_Morning_Pull_Through",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Band_Good_Morning_Pull_Through",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Good_Morning_Pull_Through/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Band_Good_Morning_Pull_Through/0.jpg",
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
