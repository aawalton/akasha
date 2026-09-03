import type { Exercise } from "../../exercise.page-type.ts"

export const supineTwoArmOverheadThrow = {
  id: "019ebc78-a73c-7b74-9abf-99cc04f60e1e",
  pageTypeSlug: "exercise",
  slug: "supine-two-arm-overhead-throw",
  title: "Supine Two-Arm Overhead Throw",
  exerciseCategory: "plyometrics",
  equipment: "medicine-ball",
  exerciseExternalId: "Supine_Two-Arm_Overhead_Throw",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Supine_Two-Arm_Overhead_Throw",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Supine_Two-Arm_Overhead_Throw/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Supine_Two-Arm_Overhead_Throw/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "lats", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
