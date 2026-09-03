import type { Exercise } from "../../exercise.page-type.ts"

export const antiGravityPress = {
  id: "019ebc76-18ea-7a75-844e-3d84c4aba077",
  pageTypeSlug: "exercise",
  slug: "anti-gravity-press",
  title: "Anti-Gravity Press",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Anti-Gravity_Press",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Anti-Gravity_Press",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Anti-Gravity_Press/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Anti-Gravity_Press/0.jpg",
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
  secondaryMuscles: ["middle-back", "traps", "triceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
