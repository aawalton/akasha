import type { Exercise } from "../../exercise.page-type.ts"

export const roundTheWorldShoulderStretch = {
  id: "019ebc77-d2e2-7309-baff-8c3ecb5986b3",
  pageTypeSlug: "exercise",
  slug: "round-the-world-shoulder-stretch",
  title: "Round The World Shoulder Stretch",
  exerciseCategory: "stretching",
  equipment: "other",
  exerciseExternalId: "Round_The_World_Shoulder_Stretch",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Round_The_World_Shoulder_Stretch",
  force: "static",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Round_The_World_Shoulder_Stretch/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Round_The_World_Shoulder_Stretch/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  movementPattern: "mobility",
  muscleFocus: "push",
  primaryMuscles: ["shoulders"],
  scoringMode: "time",
  secondaryMuscles: ["biceps", "chest"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
