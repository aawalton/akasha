import type { Exercise } from "../../exercise.page-type.ts"

export const preacherHammerDumbbellCurl = {
  id: "019ebc77-c511-713b-9db5-907faac1ffdc",
  pageTypeSlug: "exercise",
  slug: "preacher-hammer-dumbbell-curl",
  title: "Preacher Hammer Dumbbell Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Preacher_Hammer_Dumbbell_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Preacher_Hammer_Dumbbell_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Hammer_Dumbbell_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Preacher_Hammer_Dumbbell_Curl/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["biceps"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms"],
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
