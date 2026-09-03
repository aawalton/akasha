import type { Exercise } from "../../exercise.page-type.ts"

export const bearCrawlSledDrags = {
  id: "019ebc76-9ddd-74a4-986f-1efce9935e04",
  pageTypeSlug: "exercise",
  slug: "bear-crawl-sled-drags",
  title: "Bear Crawl Sled Drags",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Bear_Crawl_Sled_Drags",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bear_Crawl_Sled_Drags",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bear_Crawl_Sled_Drags/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bear_Crawl_Sled_Drags/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "gait",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
