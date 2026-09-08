import type { Exercise } from "../../exercise.page-type.ts"

export const extendedRangeOneArmKettlebellFloorPress = {
  id: "019ebc77-2fe9-7c91-a5ea-54962b01f477",
  pageTypeSlug: "exercise",
  slug: "extended-range-one-arm-kettlebell-floor-press",
  title: "Extended Range One-Arm Kettlebell Floor Press",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Extended_Range_One-Arm_Kettlebell_Floor_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Extended_Range_One-Arm_Kettlebell_Floor_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Extended_Range_One-Arm_Kettlebell_Floor_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Extended_Range_One-Arm_Kettlebell_Floor_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "beginner",
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
