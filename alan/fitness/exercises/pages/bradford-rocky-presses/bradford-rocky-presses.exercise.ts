import type { Exercise } from "../../exercise.page-type.ts"

export const bradfordRockyPresses = {
  id: "019ebc76-b5c5-752c-980c-bbc4ae65f88f",
  pageTypeSlug: "exercise",
  slug: "bradford-rocky-presses",
  title: "Bradford/Rocky Presses",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Bradford_Rocky_Presses",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bradford_Rocky_Presses",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bradford_Rocky_Presses/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bradford_Rocky_Presses/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
