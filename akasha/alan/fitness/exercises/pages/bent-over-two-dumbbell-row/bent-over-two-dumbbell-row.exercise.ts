import type { Exercise } from "../../exercise.page-type.ts"

export const bentOverTwoDumbbellRow = {
  id: "019ebc76-a633-78ff-b656-eda03a45de61",
  pageTypeSlug: "exercise",
  slug: "bent-over-two-dumbbell-row",
  title: "Bent Over Two-Dumbbell Row",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Bent_Over_Two-Dumbbell_Row",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bent_Over_Two-Dumbbell_Row",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Two-Dumbbell_Row/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Two-Dumbbell_Row/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["middle-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "lats", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
