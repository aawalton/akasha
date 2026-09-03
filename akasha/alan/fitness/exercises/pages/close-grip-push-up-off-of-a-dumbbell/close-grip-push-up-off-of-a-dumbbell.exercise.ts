import type { Exercise } from "../../exercise.page-type.ts"

export const closeGripPushUpOffOfADumbbell = {
  id: "019ebc76-ddc4-7dd8-9043-ba390cd96955",
  pageTypeSlug: "exercise",
  slug: "close-grip-push-up-off-of-a-dumbbell",
  title: "Close-Grip Push-Up off of a Dumbbell",
  exerciseCategory: "strength",
  equipment: "body-only",
  exerciseExternalId: "Close-Grip_Push-Up_off_of_a_Dumbbell",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Close-Grip_Push-Up_off_of_a_Dumbbell",
  force: "push",
  gripDemand: "high",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Push-Up_off_of_a_Dumbbell/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Close-Grip_Push-Up_off_of_a_Dumbbell/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "intermediate",
  loadFactor: 0,
  mechanic: "compound",
  movementPattern: "h-push",
  muscleFocus: "push",
  primaryMuscles: ["triceps"],
  scoringMode: "reps",
  secondaryMuscles: ["abdominals", "chest", "shoulders"],
  sfrScore: 3,
  skillCost: "moderate",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
