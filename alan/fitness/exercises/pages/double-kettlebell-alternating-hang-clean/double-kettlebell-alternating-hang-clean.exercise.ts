import type { Exercise } from "../../exercise.page-type.ts"

export const doubleKettlebellAlternatingHangClean = {
  id: "019ebc76-f245-7879-ad8d-91c1b9e99e3b",
  pageTypeSlug: "exercise",
  slug: "double-kettlebell-alternating-hang-clean",
  title: "Double Kettlebell Alternating Hang Clean",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Double_Kettlebell_Alternating_Hang_Clean",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Double_Kettlebell_Alternating_Hang_Clean",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Double_Kettlebell_Alternating_Hang_Clean/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Double_Kettlebell_Alternating_Hang_Clean/0.jpg",
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
  secondaryMuscles: ["biceps", "calves", "forearms", "glutes", "lower-back", "quadriceps", "traps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
