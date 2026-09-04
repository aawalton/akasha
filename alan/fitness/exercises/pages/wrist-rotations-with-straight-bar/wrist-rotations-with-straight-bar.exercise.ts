import type { Exercise } from "../../exercise.page-type.ts"

export const wristRotationsWithStraightBar = {
  id: "019ebc78-c2f3-7386-9d50-23f7cac5682a",
  pageTypeSlug: "exercise",
  slug: "wrist-rotations-with-straight-bar",
  title: "Wrist Rotations with Straight Bar",
  exerciseCategory: "strength",
  equipment: "barbell",
  exerciseExternalId: "Wrist_Rotations_with_Straight_Bar",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Wrist_Rotations_with_Straight_Bar",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wrist_Rotations_with_Straight_Bar/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Wrist_Rotations_with_Straight_Bar/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "isolation-other",
  muscleFocus: "pull",
  primaryMuscles: ["forearms"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
