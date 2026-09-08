import type { Exercise } from "../../exercise.page-type.ts"

export const cableJudoFlip = {
  id: "019ebc76-b936-7db7-bea5-c1c3ab06bcc5",
  pageTypeSlug: "exercise",
  slug: "cable-judo-flip",
  title: "Cable Judo Flip",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Cable_Judo_Flip",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Cable_Judo_Flip",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Judo_Flip/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cable_Judo_Flip/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
