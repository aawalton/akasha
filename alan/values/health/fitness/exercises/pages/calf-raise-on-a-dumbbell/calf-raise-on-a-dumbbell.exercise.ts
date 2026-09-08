import type { Exercise } from "../../exercise.page-type.ts"

export const calfRaiseOnADumbbell = {
  id: "019ebc76-ca3d-7383-a469-a00e4ee8ac26",
  pageTypeSlug: "exercise",
  slug: "calf-raise-on-a-dumbbell",
  title: "Calf Raise On A Dumbbell",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Calf_Raise_On_A_Dumbbell",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Calf_Raise_On_A_Dumbbell",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Raise_On_A_Dumbbell/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Raise_On_A_Dumbbell/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
