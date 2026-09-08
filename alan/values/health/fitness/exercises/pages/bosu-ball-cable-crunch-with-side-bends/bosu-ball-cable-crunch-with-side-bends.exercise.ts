import type { Exercise } from "../../exercise.page-type.ts"

export const bosuBallCableCrunchWithSideBends = {
  id: "019ebc76-a943-7c0a-8233-2b2c022ed80c",
  pageTypeSlug: "exercise",
  slug: "bosu-ball-cable-crunch-with-side-bends",
  title: "Bosu Ball Cable Crunch With Side Bends",
  exerciseCategory: "strength",
  equipment: "cable",
  exerciseExternalId: "Bosu_Ball_Cable_Crunch_With_Side_Bends",
  exerciseExternalLink:
    "https://github.com/yuhonas/free-exercise-db/tree/main/exercises/Bosu_Ball_Cable_Crunch_With_Side_Bends",
  force: "pull",
  gripDemand: "low",
  imageEndUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bosu_Ball_Cable_Crunch_With_Side_Bends/1.jpg",
  imageStartUrl:
    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Bosu_Ball_Cable_Crunch_With_Side_Bends/0.jpg",
  implementCount: 1,
  isBallistic: false,
  exerciseLastSyncedAt: "2026-07-25",
  laterality: "bilateral",
  exerciseLevel: "beginner",
  loadFactor: 0,
  mechanic: "isolation",
  movementPattern: "core-anti-lateral-flexion",
  muscleFocus: "core",
  primaryMuscles: ["abdominals"],
  scoringMode: "reps",
  sfrScore: 4,
  skillCost: "low",
  exerciseSource: "free-exercise-db",
  trainsLengthenedRange: false,
  instructions: "txt",
} as const satisfies Exercise
