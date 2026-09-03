import type { Exercise } from "../../exercise.page-type.ts"

export const legOverFloorPress = {
  id: "019ebc77-8c6e-7da7-ba4c-d024d2b1e4d5",
  pageTypeSlug: "exercise",
  slug: "leg-over-floor-press",
  title: "Leg-Over Floor Press",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Leg-Over_Floor_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Leg-Over_Floor_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg-Over_Floor_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Leg-Over_Floor_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
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
