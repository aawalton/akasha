import type { Exercise } from "../../exercise.page-type.ts"

export const zottmanPreacherCurl = {
  id: "019ebc78-c406-7af8-93a2-8b9691ad2af2",
  pageTypeSlug: "exercise",
  slug: "zottman-preacher-curl",
  title: "Zottman Preacher Curl",
  exerciseCategory: "strength",
  equipment: "dumbbell",
  exerciseExternalId: "Zottman_Preacher_Curl",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Zottman_Preacher_Curl",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Zottman_Preacher_Curl/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Zottman_Preacher_Curl/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
