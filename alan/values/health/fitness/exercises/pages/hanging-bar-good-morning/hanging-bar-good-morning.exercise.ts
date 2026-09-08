import type { Exercise } from "../../exercise.page-type.ts"

export const hangingBarGoodMorning = {
  id: "019ebc77-5655-72e0-ad94-b26366b1e401",
  pageTypeSlug: "exercise",
  slug: "hanging-bar-good-morning",
  title: "Hanging Bar Good Morning",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Hanging_Bar_Good_Morning",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Hanging_Bar_Good_Morning",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Bar_Good_Morning/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Hanging_Bar_Good_Morning/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0.6,
  mechanic: "compound",
  movementPattern: "hinge",
  muscleFocus: "legs",
  primaryMuscles: ["hamstrings"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "glutes", "lower-back"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: true,
  instructions: "txt",
} as const satisfies Exercise
