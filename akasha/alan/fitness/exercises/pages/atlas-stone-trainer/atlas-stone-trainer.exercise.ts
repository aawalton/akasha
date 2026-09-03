import type { Exercise } from "../../exercise.page-type.ts"

export const atlasStoneTrainer = {
  id: "019ebc76-1a75-7968-a69c-8672de38e987",
  pageTypeSlug: "exercise",
  slug: "atlas-stone-trainer",
  title: "Atlas Stone Trainer",
  exerciseCategory: "strongman",
  equipment: "other",
  exerciseExternalId: "Atlas_Stone_Trainer",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Atlas_Stone_Trainer",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Atlas_Stone_Trainer/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Atlas_Stone_Trainer/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "forearms", "glutes", "hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
