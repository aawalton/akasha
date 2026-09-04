import type { Exercise } from "../../exercise.page-type.ts"

export const floorPressWithChains = {
  id: "019ebc77-3e91-7f43-a0cc-8f041488b758",
  pageTypeSlug: "exercise",
  slug: "floor-press-with-chains",
  title: "Floor Press with Chains",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Floor_Press_with_Chains",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Floor_Press_with_Chains",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Floor_Press_with_Chains/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Floor_Press_with_Chains/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  secondaryMuscles: ["chest", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
