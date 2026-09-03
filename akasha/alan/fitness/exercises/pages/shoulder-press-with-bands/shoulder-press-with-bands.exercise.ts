import type { Exercise } from "../../exercise.page-type.ts"

export const shoulderPressWithBands = {
  id: "019ebc78-60f0-7098-af12-1c8ce388e20c",
  pageTypeSlug: "exercise",
  slug: "shoulder-press-with-bands",
  title: "Shoulder Press - With Bands",
  exerciseCategory: "strength",
  equipment: "bands",
  exerciseExternalId: "Shoulder_Press_-_With_Bands",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Shoulder_Press_-_With_Bands",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Shoulder_Press_-_With_Bands/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Shoulder_Press_-_With_Bands/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "v-push",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "reps",
  secondaryMuscles: ["triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
