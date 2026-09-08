import type { Exercise } from "../../exercise.page-type.ts"

export const sideToSideBoxShuffle = {
  id: "019ebc78-649b-7cf7-a64b-d1f10290ea33",
  pageTypeSlug: "exercise",
  slug: "side-to-side-box-shuffle",
  title: "Side to Side Box Shuffle",
  exerciseCategory: "plyometrics",
  equipment: "other",
  exerciseExternalId: "Side_to_Side_Box_Shuffle",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Side_to_Side_Box_Shuffle",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_to_Side_Box_Shuffle/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_to_Side_Box_Shuffle/0.jpg",
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
  secondaryMuscles: ["abductors", "adductors", "calves", "hamstrings"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
