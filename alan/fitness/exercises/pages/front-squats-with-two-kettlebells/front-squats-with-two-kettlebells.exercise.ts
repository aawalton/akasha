import type { Exercise } from "../../exercise.page-type.ts"

export const frontSquatsWithTwoKettlebells = {
  id: "019ebc77-43c9-7f4e-9ed2-50af191a1c1e",
  pageTypeSlug: "exercise",
  slug: "front-squats-with-two-kettlebells",
  title: "Front Squats With Two Kettlebells",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "Front_Squats_With_Two_Kettlebells",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Front_Squats_With_Two_Kettlebells",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Squats_With_Two_Kettlebells/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Squats_With_Two_Kettlebells/0.jpg",
  implementCount: 2,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "glutes"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
