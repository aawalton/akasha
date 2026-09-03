import type { Exercise } from "../../exercise.page-type.ts"

export const platformHamstringSlides = {
  id: "019ebc77-c1ea-7d59-882a-b5c9f0e3836a",
  pageTypeSlug: "exercise",
  slug: "platform-hamstring-slides",
  title: "Platform Hamstring Slides",
  exerciseCategory: "strength",
  equipment: "other",
  exerciseExternalId: "Platform_Hamstring_Slides",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Platform_Hamstring_Slides",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Platform_Hamstring_Slides/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Platform_Hamstring_Slides/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
