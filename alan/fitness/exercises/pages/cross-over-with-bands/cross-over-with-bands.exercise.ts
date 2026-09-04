import type { Exercise } from "../../exercise.page-type.ts"

export const crossOverWithBands = {
  id: "019ebc76-dfe1-7b53-a336-d42ce450f40b",
  pageTypeSlug: "exercise",
  slug: "cross-over-with-bands",
  title: "Cross Over - With Bands",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Cross_Over_-_With_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Cross_Over_-_With_Bands",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cross_Over_-_With_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cross_Over_-_With_Bands/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
