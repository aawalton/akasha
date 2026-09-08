import type { Exercise } from "../../exercise.page-type.ts"

export const smithMachineDeclinePress = {
  id: "019ebc78-6ca9-76f6-b1fa-dc9838dd6b95",
  pageTypeSlug: "exercise",
  slug: "smith-machine-decline-press",
  title: "Smith Machine Decline Press",
  exerciseCategory: "strength",
  equipment: "machine",
  exerciseExternalId: "Smith_Machine_Decline_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Smith_Machine_Decline_Press",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Decline_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Smith_Machine_Decline_Press/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["chest"],
  scoringMode: "reps",
  secondaryMuscles: ["shoulders", "triceps"],
  sfrScore: 3,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
