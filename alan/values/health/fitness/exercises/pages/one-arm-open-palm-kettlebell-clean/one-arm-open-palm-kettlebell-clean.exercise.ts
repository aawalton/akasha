import type { Exercise } from "../../exercise.page-type.ts"

export const oneArmOpenPalmKettlebellClean = {
  id: "019ebc77-b7dc-7e41-bddf-cb57ca8011b4",
  pageTypeSlug: "exercise",
  slug: "one-arm-open-palm-kettlebell-clean",
  title: "One-Arm Open Palm Kettlebell Clean",
  exerciseCategory: "strength",
  equipment: "kettlebells",
  exerciseExternalId: "One-Arm_Open_Palm_Kettlebell_Clean",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/One-Arm_Open_Palm_Kettlebell_Clean",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Open_Palm_Kettlebell_Clean/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Open_Palm_Kettlebell_Clean/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "unilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["forearms", "glutes", "lower-back", "quadriceps", "shoulders"],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
