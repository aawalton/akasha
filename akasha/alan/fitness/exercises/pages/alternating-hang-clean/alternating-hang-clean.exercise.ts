import type { Exercise } from "../../exercise.page-type.ts"

export const alternatingHangClean = {
  id: "019ebc75-c1b1-7714-8260-81f8e756fc6c",
  pageTypeSlug: "exercise",
  slug: "alternating-hang-clean",
  title: "Alternating Hang Clean",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Alternating_Hang_Clean",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Alternating_Hang_Clean",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Hang_Clean/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Alternating_Hang_Clean/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "alternating",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["biceps", "calves", "forearms", "glutes", "lower-back", "traps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
