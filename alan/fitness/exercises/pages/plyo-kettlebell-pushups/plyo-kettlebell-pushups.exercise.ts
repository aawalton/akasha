import type { Exercise } from "../../exercise.page-type.ts"

export const plyoKettlebellPushups = {
  id: "019ebc77-c268-793f-a61a-a27ae50b69b9",
  pageTypeSlug: "exercise",
  slug: "plyo-kettlebell-pushups",
  title: "Plyo Kettlebell Pushups",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Plyo_Kettlebell_Pushups",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Plyo_Kettlebell_Pushups",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plyo_Kettlebell_Pushups/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plyo_Kettlebell_Pushups/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
