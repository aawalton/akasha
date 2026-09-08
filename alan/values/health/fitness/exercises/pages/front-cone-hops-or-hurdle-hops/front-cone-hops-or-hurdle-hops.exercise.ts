import type { Exercise } from "../../exercise.page-type.ts"

export const frontConeHopsOrHurdleHops = {
  id: "019ebc77-41e7-7542-b209-eac94ab066e9",
  pageTypeSlug: "exercise",
  slug: "front-cone-hops-or-hurdle-hops",
  title: "Front Cone Hops (or hurdle hops)",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Front_Cone_Hops_or_hurdle_hops",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Front_Cone_Hops_or_hurdle_hops",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Cone_Hops_or_hurdle_hops/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Front_Cone_Hops_or_hurdle_hops/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "squat",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abductors", "adductors", "calves", "glutes", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
