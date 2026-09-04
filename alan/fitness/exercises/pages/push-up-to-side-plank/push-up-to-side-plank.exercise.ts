import type { Exercise } from "../../exercise.page-type.ts"

export const pushUpToSidePlank = {
  id: "019ebc77-c830-7b32-ab03-d80d48fb2449",
  pageTypeSlug: "exercise",
  slug: "push-up-to-side-plank",
  title: "Push Up to Side Plank",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Push_Up_to_Side_Plank",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Push_Up_to_Side_Plank",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push_Up_to_Side_Plank/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Push_Up_to_Side_Plank/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "core-anti-lateral-flexion",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "time",
  secondaryMuscles: ["abdominals", "shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
