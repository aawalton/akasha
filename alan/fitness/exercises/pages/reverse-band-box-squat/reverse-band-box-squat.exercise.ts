import type { Exercise } from "../../exercise.page-type.ts"

export const reverseBandBoxSquat = {
  id: "019ebc77-cb92-7413-b8e4-3855d5c48f35",
  pageTypeSlug: "exercise",
  slug: "reverse-band-box-squat",
  title: "Reverse Band Box Squat",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Reverse_Band_Box_Squat",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Reverse_Band_Box_Squat",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Band_Box_Squat/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Reverse_Band_Box_Squat/0.jpg",
  implementCount: 1,
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
  secondaryMuscles: [
    "abductors",
    "adductors",
    "calves",
    "forearms",
    "glutes",
    "hamstrings",
    "lower-back",
  ],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
