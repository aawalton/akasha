import type { Exercise } from "../../exercise.page-type.ts"

export const kettlebellPirateShips = {
  id: "019ebc77-84b6-754f-abad-8ba6a900acb5",
  pageTypeSlug: "exercise",
  slug: "kettlebell-pirate-ships",
  title: "Kettlebell Pirate Ships",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Kettlebell_Pirate_Ships",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Kettlebell_Pirate_Ships",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Pirate_Ships/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Kettlebell_Pirate_Ships/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
