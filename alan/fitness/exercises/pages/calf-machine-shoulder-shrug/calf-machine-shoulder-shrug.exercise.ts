import type { Exercise } from "../../exercise.page-type.ts"

export const calfMachineShoulderShrug = {
  id: "019ebc76-c543-755d-8eb2-8bf7be3ffa2d",
  pageTypeSlug: "exercise",
  slug: "calf-machine-shoulder-shrug",
  title: "Calf-Machine Shoulder Shrug",
  exerciseCategory: "strength",
  equipment: "machine",
  exerciseExternalId: "Calf-Machine_Shoulder_Shrug",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Calf-Machine_Shoulder_Shrug",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf-Machine_Shoulder_Shrug/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf-Machine_Shoulder_Shrug/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["traps"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
