import type { Exercise } from "../../exercise.page-type.ts"

export const deadliftWithChains = {
  id: "019ebc76-e254-7271-8074-953b962f117c",
  pageTypeSlug: "exercise",
  slug: "deadlift-with-chains",
  title: "Deadlift with Chains",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Deadlift_with_Chains",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Deadlift_with_Chains",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Deadlift_with_Chains/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Deadlift_with_Chains/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "expert",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "pull",
  primaryMuscles: ["lower-back"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "glutes", "hamstrings", "middle-back", "quadriceps", "traps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
