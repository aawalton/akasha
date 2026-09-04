import type { Exercise } from "../../exercise.page-type.ts"

export const lateralConeHops = {
  id: "019ebc77-8bae-7314-a5e4-08fd7cefcc24",
  pageTypeSlug: "exercise",
  slug: "lateral-cone-hops",
  title: "Lateral Cone Hops",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Lateral_Cone_Hops",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Lateral_Cone_Hops",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Cone_Hops/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Lateral_Cone_Hops/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "isolation-other",
  muscleFocus: "legs",
  primaryMuscles: ["adductors"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "calves", "glutes", "hamstrings", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
