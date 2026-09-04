import type { Exercise } from "../../exercise.page-type.ts"

export const chairUpperBodyStretch = {
  id: "019ebc76-ce04-7149-b458-5ba5bc8374fa",
  pageTypeSlug: "exercise",
  slug: "chair-upper-body-stretch",
  title: "Chair Upper Body Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Chair_Upper_Body_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Chair_Upper_Body_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chair_Upper_Body_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Chair_Upper_Body_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "time",
  secondaryMuscles: ["biceps", "chest"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
