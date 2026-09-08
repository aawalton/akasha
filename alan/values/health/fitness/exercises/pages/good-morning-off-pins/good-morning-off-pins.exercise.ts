import type { Exercise } from "../../exercise.page-type.ts"

export const goodMorningOffPins = {
  id: "019ebc77-49fd-75af-8727-b63cd664d539",
  pageTypeSlug: "exercise",
  slug: "good-morning-off-pins",
  title: "Good Morning off Pins",
  exerciseCategory: "powerlifting",
  equipment: "barbell",
  exerciseExternalId: "Good_Morning_off_Pins",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Good_Morning_off_Pins",
  force: "push",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Good_Morning_off_Pins/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Good_Morning_off_Pins/0.jpg",
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
