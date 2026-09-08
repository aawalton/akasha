import type { Exercise } from "../../exercise.page-type.ts"

export const rockingStandingCalfRaise = {
  id: "019ebc77-d0dd-77ef-bfd5-a06c62868c99",
  pageTypeSlug: "exercise",
  slug: "rocking-standing-calf-raise",
  title: "Rocking Standing Calf Raise",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Rocking_Standing_Calf_Raise",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Rocking_Standing_Calf_Raise",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rocking_Standing_Calf_Raise/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Rocking_Standing_Calf_Raise/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
