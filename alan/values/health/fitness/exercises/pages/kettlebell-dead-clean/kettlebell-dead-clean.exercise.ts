import type { Exercise } from "../../exercise.page-type.ts"

export const kettlebellDeadClean = {
  id: "019ebc77-8383-7568-a769-0fe321979cc2",
  pageTypeSlug: "exercise",
  slug: "kettlebell-dead-clean",
  title: "Kettlebell Dead Clean",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Kettlebell_Dead_Clean",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kettlebell_Dead_Clean",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Dead_Clean/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Dead_Clean/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes", "lower-back", "quadriceps", "traps"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
