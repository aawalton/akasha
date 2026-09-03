import type { Exercise } from "../../exercise.page-type.ts"

export const bentOverLowPulleySideLateral = {
  id: "019ebc76-a2c6-79ff-9357-daed96562c88",
  pageTypeSlug: "exercise",
  slug: "bent-over-low-pulley-side-lateral",
  title: "Bent Over Low-Pulley Side Lateral",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Bent_Over_Low-Pulley_Side_Lateral",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bent_Over_Low-Pulley_Side_Lateral",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Low-Pulley_Side_Lateral/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bent_Over_Low-Pulley_Side_Lateral/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["lower-back", "middle-back", "traps"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
