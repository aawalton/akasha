import type { Exercise } from "../../exercise.page-type.ts"

export const supineChestThrow = {
  id: "019ebc78-a6ae-7595-9eef-3272c77b7ff8",
  pageTypeSlug: "exercise",
  slug: "supine-chest-throw",
  title: "Supine Chest Throw",
  exerciseCategory: "plyometrics",
  equipment: "medicine-ball",
  exerciseExternalId: "Supine_Chest_Throw",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Supine_Chest_Throw",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Supine_Chest_Throw/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Supine_Chest_Throw/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
