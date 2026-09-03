import type { Exercise } from "../../exercise.page-type.ts"

export const seatedBentOverRearDeltRaise = {
  id: "019ebc78-542c-7ead-b270-6c048e08e9e2",
  pageTypeSlug: "exercise",
  slug: "seated-bent-over-rear-delt-raise",
  title: "Seated Bent-Over Rear Delt Raise",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Seated_Bent-Over_Rear_Delt_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Seated_Bent-Over_Rear_Delt_Raise",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_Rear_Delt_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Seated_Bent-Over_Rear_Delt_Raise/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "h-pull",
  muscleFocus: "pull",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
