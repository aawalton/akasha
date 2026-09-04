import type { Exercise } from "../../exercise.page-type.ts"

export const calfPressOnTheLegPressMachine = {
  id: "019ebc76-c5bc-7fe6-8d9a-8a6f779c3a6f",
  pageTypeSlug: "exercise",
  slug: "calf-press-on-the-leg-press-machine",
  title: "Calf Press On The Leg Press Machine",
  exerciseCategory: "strength",
  equipment: "machine",
  exerciseExternalId: "Calf_Press_On_The_Leg_Press_Machine",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Calf_Press_On_The_Leg_Press_Machine",
  force: "push",
  gripDemand: "none",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press_On_The_Leg_Press_Machine/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Calf_Press_On_The_Leg_Press_Machine/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["calves"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
