import type { Exercise } from "../../exercise.page-type.ts"

export const linear3PartStartTechnique = {
  id: "019ebc77-8ff8-7061-91c4-290929b4422e",
  pageTypeSlug: "exercise",
  slug: "linear-3-part-start-technique",
  title: "Linear 3-Part Start Technique",
  exerciseCategory: "plyometrics",
  exerciseExternalId: "Linear_3-Part_Start_Technique",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Linear_3-Part_Start_Technique",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Linear_3-Part_Start_Technique/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Linear_3-Part_Start_Technique/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["calves", "quadriceps"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
