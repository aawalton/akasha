import type { Exercise } from "../../exercise.page-type.ts"

export const openPalmKettlebellClean = {
  id: "019ebc77-bc02-73b0-8cd4-ca9300a7077e",
  pageTypeSlug: "exercise",
  slug: "open-palm-kettlebell-clean",
  title: "Open Palm Kettlebell Clean",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Open_Palm_Kettlebell_Clean",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Open_Palm_Kettlebell_Clean",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Open_Palm_Kettlebell_Clean/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Open_Palm_Kettlebell_Clean/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["glutes", "lower-back", "quadriceps", "shoulders"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
