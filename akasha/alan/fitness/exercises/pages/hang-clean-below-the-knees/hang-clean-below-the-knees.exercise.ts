import type { Exercise } from "../../exercise.page-type.ts"

export const hangCleanBelowTheKnees = {
  id: "019ebc77-4c84-7177-829d-daf004540892",
  pageTypeSlug: "exercise",
  slug: "hang-clean-below-the-knees",
  title: "Hang Clean - Below the Knees",
  exerciseCategory: "olympic-weightlifting",
  equipment: "barbell",
  exerciseExternalId: "Hang_Clean_-_Below_the_Knees",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Hang_Clean_-_Below_the_Knees",
  force: "pull",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hang_Clean_-_Below_the_Knees/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hang_Clean_-_Below_the_Knees/0.jpg",
  implementCount: 1,
  isBallistic: true,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["quadriceps"],
  scoringMode: "reps",
  secondaryMuscles: [
    "calves",
    "forearms",
    "glutes",
    "hamstrings",
    "lower-back",
    "shoulders",
    "traps",
  ],
  sfrScore: 2,
  skillCost: "high",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
